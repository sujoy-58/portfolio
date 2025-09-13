import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";

export async function POST(req) {
  try {
    const body = await req.json();

    // Save to a file
    const filePath = path.join(process.cwd(), "submissions.txt");
    const dataToWrite = `
    Name: ${body.name}
    Company: ${body.company}
    Email: ${body.email}
    Description: ${body.description}
    Services: ${body.services.join(", ")}
    Timeline: ${body.timeline}
    Deadline: ${body.deadline}
--------------------------
`;
    fs.appendFileSync(filePath, dataToWrite);

    // Send email
    const transporter = nodemailer.createTransport({
      service: "gmail", // or your email provider
      auth: {
        user: process.env.EMAIL_USER, // your email
        pass: process.env.EMAIL_PASS, // app password
      },
    });

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: "sujoymaji017@gmail.com",
      subject: "New Contact Form Submission",
      text: dataToWrite,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ success: false, error }), {
      status: 500,
    });
  }
}
