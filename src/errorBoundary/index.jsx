import React from "react";
// import "./ErrorBoundry.scss";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        console.log("object", error);
        return { hasError: true, err: error };
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="error_section w-full text-center">
                    <h1>Page is Broken</h1>
                    <pre className="error_pre">
                        Error : {`${this.state.err["message"]}`}
                    </pre>
                    <pre>{`${this.state.err["stack"]}`}</pre>
                </div>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;