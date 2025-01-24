function App() {
    if (process.env.REACT_APP_MAINTENANCE_MODE === "true") {
        return (
            <div style={{ textAlign: "center", marginTop: "20%" }}>
                <h1>🚧 Under Maintenance 🚧</h1>
                <p>Our website is currently undergoing maintenance. Please check back later!</p>
            </div>
        );
    }

    return (
        <div>
            <h1>Welcome to My OpenOct Community!</h1>
        </div>
    );
}

export default App;
