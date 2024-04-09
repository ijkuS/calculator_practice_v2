document.addEventListener('DOMContentLoaded', () => {
	const resultInput = document.getElementById('result');
	const toggleButtons = document.querySelectorAll('.toggle-button');
	changeTheme();

	// restrict input to valid characters
	resultInput.addEventListener('input', () => {
		const allowedChars = /^[0-9\-*x×/.]*$/; // Regex for allowed characters
		if (!allowedChars.test(resultInput.value)) {
			resultInput.value = resultInput.value.replace(/[^0-9+\-*x×/.]/g, '');
			// Remove invalid chars
		}
	});

	// Set default opacity
	toggleButtons.forEach((btn, index) => {
		btn.style.opacity = index === 0 ? '1' : '0'; // Only the first button is fully visible
	});

	toggleButtons.forEach((btn) => {
		btn.addEventListener('click', () => {
			btn.style.opacity = '1';

			toggleButtons.forEach((item) => {
				if (item !== btn) {
					item.style.opacity = '0';
				}
			});
		});
	});
	document.querySelectorAll('.theme-numbers > p').forEach((pElement) => {
		pElement.addEventListener('click', () => {
			const radioId = pElement.getAttribute('data-radio-id');
			document.getElementById(radioId).checked = true;

			//optionally, adjust the opacity of radio buttons based on selection
			toggleButtons.forEach((toggleButton) => {
				toggleButton.style.opacity =
					toggleButton.id === radioId ? '1' : '0';
			});
		});
	});

	//handles click events on the calculator's keypad
	document.querySelector('#keypad').addEventListener('click', (e) => {
		if (e.target.tagName === 'BUTTON') {
			let value = e.target.textContent;
			value = value.replace(/x|×/g, '*');
			handleInput(value);
		}
	});

	//handle 'Enter' key for solving the expression
	document.addEventListener('keydown', (e) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			solve();
		}
	});

	function handleInput(value) {
		switch (value) {
			case 'C': // clear
				clearDisplay();
				break;

			case 'DEL':
				del();
				break;

			case '=':
				solve();
				break;

			default: // append value
				displayInput(value);
				break;
		}
	}

	//append the value to the display
	function displayInput(value) {
		resultInput.value += value;
	}

	// Clears the display
	function clearDisplay() {
		resultInput.value = '';
	}

	function del() {
		resultInput.value = resultInput.value.slice(0, -1);
	}

	function solve() {
		try {
			// replace 'x' with '*' for multiplicatino before evaluation
			const expression = resultInput.value.replace(/x/g, '*');
			resultInput.value = eval(expression);
		} catch (error) {
			resultInput.value = 'Error';
			console.error(error);
		}
	}

	function changeTheme() {
		document.querySelectorAll('.theme-numbers > p').forEach((pElement) => {
			pElement.addEventListener('click', () => {
				const themeId = pElement.getAttribute('data-radio-id');
				applyTheme(themeId);
			});

			toggleButtons.forEach((button) => {
				button.addEventListener('change', () => {
					//use the radio button's ID as the theme ID
					applyTheme(button.id);
				});
			});
		});
	}
	function applyTheme(themeId) {
		//convert themeId to the expected class naming convention
		const className = themeId;
		//remove existing theme classes
		document.body.classList.remove('one', 'two', 'three');
		//add thee selected theme class based on clicked paragraph
		document.body.classList.add(className);
	}
});
