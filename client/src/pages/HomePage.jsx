function HomePage() {
	return (
		<div className="flex flex-col items-center justify-center h-[calc(100vh-100px)] ">
			<h1 className=" text-2xl md:text-4xl font-bold my-3 text-sky-600 px-4 ">
				Welcome to My Aplication
			</h1>

			<h3 className=" text-xl md:text-2xl my-3 text-amber-50 px-4">
				{" "}
				This is my Fullstack Application{" "}
			</h3>
		</div>
	);
}

export default HomePage;
