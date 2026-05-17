import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error("Uncaught error:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="error-boundary-v">
          <div className="error-content-v">
            <div className="error-icon-wrapper-v">
              <AlertTriangle size={64} className="error-icon-v" />
            </div>
            <h1>Discovery Anomaly Detected</h1>
            <p>We encountered a technical handshake failure while restoring your cinematic experience. Don't worry, your discovery pathway is still secure.</p>
            
            <div className="error-actions-v">
              <button onClick={this.handleReset} className="error-btn-primary-v">
                <RefreshCw size={20} />
                <span>RESTORE DISCOVERY</span>
              </button>
              <button onClick={() => window.location.href = '/'} className="error-btn-secondary-v">
                <Home size={20} />
                <span>RETURN HOME</span>
              </button>
            </div>

            {process.env.NODE_ENV === 'development' && (
              <div className="error-details-v">
                <pre>{this.state.error?.toString()}</pre>
              </div>
            )}
          </div>

          <style dangerouslySetInnerHTML={{ __html: `
            .error-boundary-v { 
              min-height: 100vh; 
              background: #000; 
              display: flex; 
              align-items: center; 
              justify-content: center; 
              padding: 40px;
              font-family: 'Inter', sans-serif;
              color: #fff;
              text-align: center;
            }
            .error-content-v {
              max-width: 600px;
              width: 100%;
              animation: errorFadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1);
            }
            @keyframes errorFadeIn {
              from { opacity: 0; transform: translateY(20px); }
              to { opacity: 1; transform: translateY(0); }
            }
            .error-icon-wrapper-v {
              width: 120px;
              height: 120px;
              background: rgba(255, 0, 0, 0.1);
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              margin: 0 auto 30px;
              border: 1px solid rgba(255, 0, 0, 0.2);
              box-shadow: 0 20px 40px rgba(255, 0, 0, 0.1);
            }
            .error-icon-v { color: #b3d332; }
            .error-content-v h1 {
              font-size: 2.5rem;
              font-weight: 900;
              letter-spacing: -1px;
              margin-bottom: 20px;
              text-transform: uppercase;
            }
            .error-content-v p {
              font-size: 1.1rem;
              color: rgba(255,255,255,0.6);
              line-height: 1.6;
              margin-bottom: 40px;
            }
            .error-actions-v {
              display: flex;
              gap: 20px;
              justify-content: center;
            }
            .error-btn-primary-v {
              background: #b3d332;
              color: #fff;
              border: none;
              padding: 15px 30px;
              border-radius: 12px;
              font-weight: 800;
              font-size: 1rem;
              display: flex;
              align-items: center;
              gap: 12px;
              cursor: pointer;
              transition: 0.3s cubic-bezier(0.16, 1, 0.3, 1);
              box-shadow: 0 10px 20px rgba(255, 0, 0, 0.2);
            }
            .error-btn-primary-v:hover {
              transform: translateY(-2px);
              background: #b3d332;
              box-shadow: 0 15px 30px rgba(255, 0, 0, 0.4);
            }
            .error-btn-secondary-v {
              background: rgba(255,255,255,0.05);
              color: #fff;
              border: 1px solid rgba(255,255,255,0.1);
              padding: 15px 30px;
              border-radius: 12px;
              font-weight: 800;
              font-size: 1rem;
              display: flex;
              align-items: center;
              gap: 12px;
              cursor: pointer;
              transition: 0.3s;
            }
            .error-btn-secondary-v:hover {
              background: rgba(255,255,255,0.1);
              border-color: rgba(255,255,255,0.2);
            }
            .error-details-v {
              margin-top: 50px;
              padding: 20px;
              background: #111;
              border: 1px solid #222;
              border-radius: 12px;
              text-align: left;
              max-height: 200px;
              overflow-y: auto;
            }
            .error-details-v pre {
              color: #ff4d4d;
              font-size: 0.8rem;
              font-family: 'JetBrains Mono', monospace;
              white-space: pre-wrap;
            }
          ` }} />
        </div>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
