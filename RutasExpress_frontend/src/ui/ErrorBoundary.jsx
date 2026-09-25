import { Component } from "react";
import { Card } from "./Card";
import { Button } from "./Button";

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary atrapó un error:", error, errorInfo);
  }

  handleReload = () => {
    window.location.href = "/";
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="rex-error-boundary">
          <Card padding="lg" className="rex-error-boundary__card">
            <h1 className="rex-error-boundary__title">Algo salió mal</h1>
            <p className="rex-error-boundary__text">
              Ocurrió un error inesperado. Puedes intentar recargar la página.
            </p>
            {import.meta.env.DEV && this.state.error && (
              <pre className="rex-error-boundary__details">
                {this.state.error.toString()}
              </pre>
            )}
            <Button variant="primary" onClick={this.handleReload}>
              Volver al inicio
            </Button>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}