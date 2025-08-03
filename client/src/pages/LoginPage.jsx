import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function LoginPage() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const { signin, errors: signinErrors, isAuthenticated } = useAuth();
	const navigate = useNavigate();

	const onSubmit = handleSubmit((data) => {
		signin(data);
	});

	useEffect(() => {
		if (isAuthenticated) {
			navigate("/tasks");
		}
	}, [isAuthenticated]);

	return (
		<div className="flex items-center justify-center h-[calc(100vh-100px)]">
			<div className="bg-zinc-800 max-w-md  w-full p-10 rounded-md ">
				{signinErrors.map((error, index) => (
					<p
						key={index}
						className="bg-red-500 text-white p-2 text-center rounded-md my-2  "
					>
						{error}
					</p>
				))}

				<h1 className="text-2xl font-bold">Login</h1>

				<form onSubmit={onSubmit}>
					<input
						type="email"
						{...register("email", { required: true })}
						className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
						placeholder="Email"
					/>

					{errors.email && <p className="text-red-500">Email is required</p>}

					<input
						type="password"
						{...register("password", { required: true })}
						className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
						placeholder="Password"
					/>

					{errors.password && (
						<p className="text-red-500">Password is required</p>
					)}

					<button type="submit">Login</button>
				</form>

				<p className="flex gap-x-2 justify-between  ">
					Dont't have an account?{" "}
					<Link to="/register" className="text-sky-500">
						Sign up
					</Link>
				</p>
			</div>
		</div>
	);
}

export default LoginPage;
