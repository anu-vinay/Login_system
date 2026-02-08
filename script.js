let generatedOTP;
let latitude;
let longitude;
let resendTimer;
let timeLeft = 30;

function sendOTP() {
  const userInput = document.getElementById("userInput").value;
  if (userInput === "") {
    alert("Enter email or phone number");
    return;
  }

  generatedOTP = Math.floor(100000 + Math.random() * 900000);

  navigator.geolocation.getCurrentPosition(
    (position) => {
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;

      document.getElementById("locationText").innerHTML =
        "Latitude: " + latitude + "<br>Longitude: " + longitude;

      if (userInput.includes("@")) {
        sendEmailOTP(userInput);
      } else {
        alert("error!!!");
      }
    },
    () => {
      alert("Location access denied");
    }
  );
}

function sendEmailOTP(email) {
  const params = {
    to_email: email,
    otp: generatedOTP,
    latitude: latitude,
    longitude: longitude,
    from_name: "Runit"
  };
  startResendTimer();


  emailjs
    .send("service_8rx5xbo", "template_io4ltzy", params)
    .then(() => {
      alert("OTP sent to your email");
    })
    .catch((error) => {
      console.log(error);
      alert("Email sending failed");
    });
}
function resendOTP() {
  generatedOTP = Math.floor(100000 + Math.random() * 900000);

  const userInput = document.getElementById("userInput").value;

  if (userInput.includes("@")) {
    sendEmailOTP(userInput);
    startResendTimer();
  }
}

function startResendTimer() {
  const resendBtn = document.getElementById("resendBtn");
  const timerText = document.getElementById("timerText");

  resendBtn.disabled = true;
  timeLeft = 30;

  timerText.innerText = `Resend OTP in ${timeLeft}s`;

  resendTimer = setInterval(() => {
    timeLeft--;
    timerText.innerText = `Resend OTP in ${timeLeft}s`;

    if (timeLeft <= 0) {
      clearInterval(resendTimer);
      resendBtn.disabled = false;
      timerText.innerText = "You can resend OTP now";
    }
  }, 1000);
}

function verifyOTP() {
  const enteredOTP = document.getElementById("otpInput").value;

  if (enteredOTP == generatedOTP) {
    document.getElementById("message").innerHTML =
      "OTP verified .... \n Location verified...";
  } else {
    document.getElementById("message").innerHTML =
      "Invalid OTP ";
  }
}
