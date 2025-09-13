import Navbar from "../Components/Navbar/Navbar";
import Hero from "../Components/Hero/Hero";
import Quotes from "../Components/Quotes/Quotes";
import Banner from "../Components/Banner/Banner";
import Banner2 from "../Components/Banner/Banner2";
import Features from "../Components/Features/Features";
import AppStore from "../Components/AppStore/AppStore";
import Footer from "../Components/Footer/Footer";
import PopupPlayer from "../Components/PopupPlayer/PopupPlayer";
import Chatbot from "../Components/Chatbot/Chatbot";
import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const HomePage = () => {
	const [isPlay, setIsPlay] = useState(false);

	const togglePlay = () => {
		setIsPlay(!isPlay);
	};

	useEffect(() => {
		AOS.init({
			offset: 100,
			duration: 800,
			easing: "ease-in-sine",
			delay: 100,
		});
		AOS.refresh();
	}, []);

	return (
		<main className="overflow-x-hidden bg-white dark:bg-black text-black dark:text-white duration-300">
			<Navbar />
			{/* spacer for fixed navbar height */}
			<div className="h-16" />
			<section id="home">
				<Hero togglePlay={togglePlay} />
			</section>
			<section id="explore">
				<Quotes />
			</section>
			<section id="explore-2">
				<Banner />
			</section>
			<section id="explore-3">
				<Banner2 />
			</section>
			<section id="features">
				<Features />
			</section>
			<section id="contact">
				<AppStore />
			</section>
			<Footer />
			<Chatbot />

			{/* Video Player */}
			<PopupPlayer isPlay={isPlay} togglePlay={togglePlay} />
		</main>
	);
};
export default HomePage;
