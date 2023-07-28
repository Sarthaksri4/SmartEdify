const {instance} = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const { default: mongoose } = require("mongoose");



//capture the payment and initiate the Razorpay order
exports.capturePayment = async (req, res) => {
    //get courseId and UserID
    const {course_id} = req.body;
    const userId = req.user.id;
    //validation
    //valid courseID
    if(!course_id) {
        return res.json({
            success:false,
            message:'Please provide valid course ID',
        })
    };
    //valid courseDetail
    let course;
    try{
        course = await Course.findById(course_id);
        if(!course) {
            return res.json({
                success:false,
                message:'Could not find the course',
            });
        }

        //user already pay for the same course
        const uid = new mongoose.Types.ObjectId(userId); //userid jo ki string me hai usko object id me convert kiya
        if(course.studentsEnrolled.includes(uid)) {
            return res.status(200).json({
                success:false,
                message:'Student is already enrolled',
            });
        }
    }
    catch(error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
    
    //order create
    const amount = course.price;
    const currency = "INR";

    const options = {
        amount: amount * 100,
        currency,
        receipt: Math.random(Date.now()).toString(),
        notes:{
            courseId: course_id,
            userId,
        }
    };

    try{
        //initiate the payment using razorpay
        const paymentResponse = await instance.orders.create(options);
        console.log(paymentResponse);
        //return response
        return res.status(200).json({
            success:true,
            courseName:course.courseName,
            courseDescription:course.courseDescription,
            thumbnail: course.thumbnail,
            orderId: paymentResponse.id,
            currency:paymentResponse.currency,
            amount:paymentResponse.amount,
        });
    }
    catch(error) {
        console.log(error);
        res.json({
            success:false,
            message:"Could not initiate order",
        });
    }
};
//verify Signature of Razorpay and Server

exports.verifySignature = async (req, res) => {
    const webhookSecret = "12345678";   //ye secretkey sever pr hogi

    const signature = req.headers["x-razorpay-signature"];  //ye secret key razorpay ke pass hoga

    const shasum =  crypto.createHmac("sha256", webhookSecret);   //Hashed based method authentication course
    shasum.update(JSON.stringify(req.body)); 
    const digest = shasum.digest("hex");  //webhook secret key ko convert kr diya digest ke andr

    if(signature === digest) {
        console.log("Payment is Authorised");
    
        try{
            //fulfil the action

            //find the course and enroll the student in it
            const enrolledCourse = await Course.findOneAndUpdate(
                                            {_id: courseId},
                                            {$push:{studentsEnrolled: userId}},
                                            {new:true},
            );

            if(!enrolledCourse) {
                return res.status(500).json({
                    success:false,
                    message:'Course not Found',
                });
            }

            console.log(enrolledCourse);

            //find the student andadd the course to their list enrolled courses me 
            const enrolledStudent = await User.findOneAndUpdate(
                                            {_id:userId},
                                            {$push:{courses:courseId}},
                                            {new:true},
            );

            console.log(enrolledStudent);

            //mail send krdo confirmation wala 
            const emailResponse = await mailSender(
                                    enrolledStudent.email,
                                    "Congratulations from SmartEdify",
                                    "Congratulations, you are onboarded into new SmartEdify Course",
            );

            console.log(emailResponse);
            return res.status(200).json({
                success:true,
                message:"Signature Verified and COurse Added",
            });


          }       
        catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
    }
   else {
    return res.status(400).json({
        success:false,
        message:'Invalid request',
    });
}

};