import { useState } from 'react';
import './styles.css';

function App() {
	const [count, setCount] = useState(0);

	return (
		<div className="App">
			<header>
				<h1>Hello from React on Red Hat Openshift !</h1>
			</header>
			<main>
				<h2>Simple Counter</h2>
				<p>Count: {count}</p>
				<button onClick={() => setCount(c => c + 1)}>Increment</button>
				<button onClick={() => setCount(c => c - 1)}>Increment</button>
				<button onClick={() => setCount(0)}>Reset</button>
			</main>
			<footer>
				<small>Deployed with Dockerfile - Nginx</small>
			</footer>
		</div>
	);
}

export default App;
