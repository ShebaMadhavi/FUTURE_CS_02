let leads = JSON.parse(localStorage.getItem("leads")) || [];

if(!localStorage.getItem("auth")){
  window.location.href="login.html";
}

function logout(){
  localStorage.removeItem("auth");
  window.location.href="login.html";
}

function addLead(){
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const source = document.getElementById("source").value;

  leads.push({name,email,source,status:"New"});
  localStorage.setItem("leads", JSON.stringify(leads));
  render();
}

function render(){
  const table = document.getElementById("table");
  const search = document.getElementById("search").value.toLowerCase();

  table.innerHTML="";

  let filtered = leads.filter(l => l.name.toLowerCase().includes(search));

  document.getElementById("total").innerText = leads.length;
  document.getElementById("converted").innerText =
    leads.filter(l=>l.status==="Converted").length;
  document.getElementById("new").innerText =
    leads.filter(l=>l.status==="New").length;

  filtered.forEach((l,i)=>{
    table.innerHTML += `
    <tr>
      <td>${l.name}</td>
      <td>${l.email}</td>
      <td>${l.source}</td>
      <td>
        <select onchange="updateStatus(${i},this.value)">
          <option ${l.status==="New"?"selected":""}>New</option>
          <option ${l.status==="Contacted"?"selected":""}>Contacted</option>
          <option ${l.status==="Converted"?"selected":""}>Converted</option>
        </select>
      </td>
      <td><button onclick="del(${i})">Delete</button></td>
    </tr>`;
  });
}

function del(i){
  leads.splice(i,1);
  localStorage.setItem("leads", JSON.stringify(leads));
  render();
}

function updateStatus(i,status){
  leads[i].status = status;
  localStorage.setItem("leads", JSON.stringify(leads));
  render();
}

render();