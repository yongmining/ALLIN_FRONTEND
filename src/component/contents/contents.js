import React from "react";
import Contentsitem from "./contentsitem";


const Contentdata = [
	{
		title: "Lorem ipsum, dolor sit",
		desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nisi vitae ullam nemo perspiciatis nostrum?",
		technology: "Lorem, ipsum, dolor sit amet, consectetur, adipisicing elit",
		url: "https://example.com",
		id: "1",
	},
	{
		title: "Lorem ipsum, dolor sit",
		desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nisi vitae ullam nemo perspiciatis nostrum?",
		technology: "Lorem, ipsum, dolor sit amet, consectetur, adipisicing elit",
		url: "https://example.com",
		id: "2",
	},
	{
		title: "Lorem ipsum, dolor sit",
		desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nisi vitae ullam nemo perspiciatis nostrum?",
		technology: "Lorem, ipsum, dolor sit amet, consectetur, adipisicing elit",
		url: "https://example.com",
		id: "3",
	},
];

const Contents = () => {
	return (
		<div>
			<h3>All contents</h3>
			<div className="Contents">
				{Contentdata.map((item, i) => (
					<Contentsitem key={i} content={item}></Contentsitem>
				))}
			</div>
		</div>
	);
};

export default Contents;
