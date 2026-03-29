import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorCount: 0
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details for debugging
    console.error('Error caught by boundary:', error);
    console.error('Error info:', errorInfo);
    
    this.setState(prevState => ({
      error,
      errorInfo,
      errorCount: prevState.errorCount + 1
    }));
  }

  resetError = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <section className="py-16 sm:py-24 bg-gray-50 min-h-screen pt-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white p-8 rounded-lg shadow-lg border border-red-200 max-w-2xl mx-auto">
              <div className="flex items-center justify-center mb-6">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-red-100">
                  <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 text-center mb-4">
                Oops! Something went wrong
              </h1>
              
              <p className="text-gray-600 text-center mb-6">
                We encountered an unexpected error while displaying this page.
              </p>

              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="mb-6 bg-gray-50 p-4 rounded border border-gray-200">
                  <summary className="cursor-pointer font-semibold text-gray-700 mb-2">
                    Error Details (Development Only)
                  </summary>
                  <pre className="text-xs text-gray-600 overflow-auto max-h-48 bg-white p-3 border border-gray-200 rounded">
                    {this.state.error.toString()}
                    {this.state.errorInfo && this.state.errorInfo.componentStack}
                  </pre>
                </details>
              )}

              <div className="flex gap-4 justify-center">
                <button
                  onClick={this.resetError}
                  className="bg-amber-500 text-white font-bold px-6 py-3 rounded-full shadow-lg hover:bg-amber-600 transition duration-150"
                >
                  Try Again
                </button>
                
                <a
                  href="/"
                  className="bg-gray-500 text-white font-bold px-6 py-3 rounded-full shadow-lg hover:bg-gray-600 transition duration-150"
                >
                  Go Home
                </a>
              </div>

              {this.state.errorCount > 3 && (
                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded text-sm text-blue-800">
                  <strong>Multiple errors detected.</strong> Please refresh the page or clear your browser cache if the problem persists.
                </div>
              )}
            </div>
          </div>
        </section>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
