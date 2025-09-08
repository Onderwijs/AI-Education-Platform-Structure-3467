import React from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Error boundary for better error handling
class ErrorBoundary extends React.Component {
constructor(props) {
super(props);
this.state={hasError: false};
}

static getDerivedStateFromError(error) {
return {hasError: true};
}

componentDidCatch(error,errorInfo) {
console.error('Application error:',error,errorInfo);
}

render() {
if (this.state.hasError) {
return (
<div style={{padding: '20px',textAlign: 'center',fontFamily: 'Arial,sans-serif'}}>
<h1>Er is iets misgegaan</h1>
<p>Probeer de pagina te verversen.</p>
<button
onClick={()=> window.location.reload()}
style={{padding: '10px 20px',backgroundColor: '#0284c7',color: 'white',border: 'none',borderRadius: '5px',cursor: 'pointer'}}
>
Ververs pagina
</button>
</div>
);
}

return this.props.children;
}
}

const container=document.getElementById('root');
if (!container) {
throw new Error('Root element not found');
}

const root=createRoot(container);
root.render(
<React.StrictMode>
<ErrorBoundary>
<App />
</ErrorBoundary>
</React.StrictMode>
);