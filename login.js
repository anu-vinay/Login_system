let loginOTP;

function sendLoginOTP() {
  const input = document.getElementById("loginInput").value;

  if (!input) {
    alert("Enter email");
    return;
  }

  loginOTP = Math.floor(100000 + Math.random() * 900000);
  console.log("Generated OTP:", loginOTP);

  if (input.includes("@")) {
    emailjs.send(
      "service_8rx5xbo",
      "template_io4ltzy",
      {
        to_email: input,
        otp: loginOTP,
        from_name: "Runit"
      }
    )
    .then(() => {
      alert("OTP sent to email");
    })
    .catch((error) => {
      console.error("EmailJS Error:", error);
      alert("Email sending failed");
    });
  } else {
    alert("Phone OTP needs backend");
  }
}

function verifyLoginOTP() {
  const entered = document.getElementById("loginOTP").value;
  const msg = document.getElementById("loginMsg");

  if (entered == loginOTP) {
    msg.style.color = "green";
    msg.innerText = "Login successful";
  } else {
    msg.style.color = "red";
    msg.innerText = "Invalid OTP";
  }
}