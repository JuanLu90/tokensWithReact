import React from "react";

//Definimos las propiedades

const Login: React.FC = () => {
  const [usernameValue, setInputUsername] = React.useState("");
  const [passwordValue, setInputPassword] = React.useState("");

  const updateInputUsername = (event: React.ChangeEvent<HTMLInputElement>) =>
    setInputUsername(event.currentTarget.value);

  const updateInputPassword = (event: React.ChangeEvent<HTMLInputElement>) =>
    setInputPassword(event.currentTarget.value);

  const getToken = () => {
    fetch("http://localhost:8080/api/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username: usernameValue, password: passwordValue })
    }).then(response => {
      if (response.ok) {
        response.text().then(token => {
          sessionStorage.setItem("token", token);
        });
      }
    });

    // fetch("api/users", {
    //   //es una promesa
    //   headers: {
    //     // "Content-type": "application/json",
    //     // Authorization: "Bearer " + token
    //   }
    // }).then(response => {
    //   if (response.ok) {
    //     response.json().then(json =>
    //       json.map((user: any) => {
    //         console.log(user);
    //       })
    //     );
    //   }
    // });

    fetch("api/users")
      .then(response => response.json())
      .then(data =>
        data.map((user: any) => {
          console.log(user);
        })
      );
  };

  return (
    <>
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          id="username"
          name="username"
          placeholder="User"
          onChange={updateInputUsername}
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          className="form-control"
          id="password"
          name="password"
          placeholder="Password"
          onChange={updateInputPassword}
        />
      </div>
      <div className="text-center">
        <button
          type="submit"
          className="btn btn-warning w-50"
          onClick={getToken}
        >
          Login
        </button>
      </div>
    </>
  );
};

export default Login;
