"use client";
import React from "react";

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch() {
  }

  render() {
    if (this.state.hasError) {
      return <div className="p-8 text-center text-red-600 bg-red-100 rounded-lg">Something went wrong.</div>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
