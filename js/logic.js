//Trying to add the content of the input box to the novelContainer

let novel=document.getElementsByClassName('inupuNovel')[0];
let content=document.getElementsByClassName('textContainer')[0];



function start()
{
	console.log("you pressed the button");
	novel.appendChild(removeSpace(content.value).join(""));
}
//console.log(removeSpace(novel.value));


function removeSpace(str)
{
	let word = [];
	for (var i = 0,j=0; i <= (str.length - 1); i++) {
		

		if ((str[i]>='a' && str[i]<='z') || (str[i]>='A'&& str[i]<='Z'))
		{
			//console.log(str[i]);
			word.push(str[i]);
		}
	}

	//console.log("the word is" + word);
	return word;
}