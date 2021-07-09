const loginForm = document.getElementById("login-form");
const codeInput = document.getElementById("OTPInput");
let mobileNo;
let isOTPDelivered = false;
const responseHTML = document.querySelector(".response");

loginForm.addEventListener("submit", async (e) => {

  e.preventDefault();
  //document.getElementById("mobileNoInput") gives object, we want value only
  mobileNo = parseInt(document.getElementById("mobileNoInput").value);
  if (isNaN(mobileNo)) {
    alert("Invalid Phone Number");
  } else {
    if (isOTPDelivered) {
      const OTP = codeInput.value;
      const response = await verifyOTP(mobileNo, OTP);
      console.log(response)
    //   alert("Valid OTP");
     setResponse(response.status);
      return;
    }

    const response = await sendVerificationCode(mobileNo);
    if (response.status === "pending") {
      codeInput.parentElement.classList.remove("hidden");
      isOTPDelivered = true;
    }
  }
});

async function sendVerificationCode(mobileNo) {
  const res = await axios.post('http://localhost:3005/send-OTP', {
    mobileNo,
  });

  if (res.status === 200) {
    return res.data.verification;
  } else {
    return res.data;
  }
}

async function verifyOTP(mobileNo, OTP) {
  const res = await axios.post('http://localhost:3005/verify-OTP', {
    mobileNo,
    OTP,
  });

  if (res.status === 200) {
    return res.data.verification_check;
  } else {
    return res.data;
  }
}

function setResponse(status) {
  if (status === "pending") {
    alert('Invalid OTP')
  } else if (status === "approved") {
    alert('Valid OTP')
  }
}