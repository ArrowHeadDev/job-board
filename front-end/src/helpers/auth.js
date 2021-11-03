import { BehaviorSubject } from "rxjs";
//import { jwtHelpers } from "./jwt.js";
import axios from "axios";
axios.defaults.withCredentials = true;
//axios.defaults.headers.common = {'x-access-token': `${localStorage.getItem("token")}`}
//axios.defaults.headers.common = {'x-access-token': `${this.$cookies.get('access_token')}`}
import swal from "sweetalert2";
import router from "../router/index.js";



/* var myToken = this.$cookies.get("access_token");
console.log(myToken); */



//create a subject we can watch for
const currentUserSubj = new BehaviorSubject(
  JSON.parse(localStorage.getItem("currentUser"))
);
export const authService = {
  login,
  logout,
  getRole,
  //define the variable as observable property
  currentUser: currentUserSubj.asObservable(),

  //Gets the current UserValue of logged in user without need to update
  get currentUserValue() {
    return currentUserSubj.value;
  },

  
};


function getRole(){
var role = this.currentUserValue.role

/* var decoded = jwtHelpers.decode(jwt)
var role = decoded.role */
return role

}
//removes user from local storage
async function logout() {
  localStorage.removeItem("currentUser");
  currentUserSubj.next(null);


//request to api to delete token
try{
  await axios
  .get("http://localhost:8500/api/logout")
  .then((this.success=true))
}catch(err){
  console.log(err)
}

if(this.success == true){
  router.go('/')
}

  
}

async function login(formData, isCompany) {
  
  var user;
  //Send POST request to people/login if isCompany false else send to company/login
  if (!isCompany) {
    try {
      await axios
        .post("http://localhost:8500/api/people/login", formData)
        //.then((response) => response.data)
        .then((user) => {
          localStorage.setItem("currentUser", JSON.stringify(user.data));
        });
        
      //var token = jwtHelpers.decode(data.jwt);
      //mutations.setUser(data.userInfo, data.userInfo.email, token);
      location.reload(true);
      router.push('/')
      currentUserSubj.next(user);

      return user;

      
    } catch (err) {
      if (err.response) {
        if (err.response.status == "401") {
          swal.fire({
            title: "Incorrect login info, please try again",
            icon: "error",
          });
        } else {
          swal.fire({
            title: err,
            text:
              "There was an error on the Network side, please verify input or contact admin",
            icon: "error",
          });
        }

        console.log("Server ERROR", err);
      } else if (err.request) {
        swal.fire({
          title: err.request,
          text:
            "There was an error on the Server side, please verify input or contact admin",
          icon: "error",
        });
      } else {
        swal.fire({
          title: err,
          text:
            "There was an error on the Client side, please verify input or contact admin",
          icon: "error",
        });
      }
    }
    //Company login logic
  } else {
    try {
      await axios
        .post("http://localhost:8500/api/company/login", formData)
        //.then((response) => response.data)
        .then((user) => {
          localStorage.setItem("currentUser", JSON.stringify(user.data));
        });
      router.push('/')
      location.reload(true);
      currentUserSubj.next(user);


      return user;
    } catch (err) {
      if (err.response) {
        if (err.response.status == "401") {
          swal.fire({
            title: "Incorrect login info, please try again",
            icon: "error",
          });
        } else {
          swal.fire({
            title: err,
            text:
              "There was an error on the Network side, please verify input or contact admin",
            icon: "error",
          });
        }

        console.log("Server ERROR", err);
      } else if (err.request) {
        swal.fire({
          title: err.request,
          text:
            "There was an error on the Server side, please verify input or contact admin",
          icon: "error",
        });
      } else {
        swal.fire({
          title: err,
          text:
            "There was an error on the Client side, please verify input or contact admin",
          icon: "error",
        });
      }
    }
  }
}
