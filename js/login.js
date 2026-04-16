let show = false;

function togglePass(){
  const pass = document.getElementById("password");
  show = !show;
  pass.type = show ? "text" : "password";
}

function login(){
  const email = document.getElementById("email").value;
  const pass = document.getElementById("password").value;

  if(email === "admin@gmail.com" && pass === "1234"){
    localStorage.setItem("auth","true");
    window.location.href = "dashboard.html";
  } else {
    alert("Invalid Credentials");
  }
}