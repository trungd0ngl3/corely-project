"use client"

import * as React from "react"

type Props = {
    children: React.ReactNode
    fallback?: React.ReactNode
}

type State = {
    hasError: boolean
}

export class ErrorBoundary extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = { hasError: false }
    }

    static getDerivedStateFromError() {
        return { hasError: true }
    }

    componentDidCatch(error: unknown, info: unknown) {
        // ponytail: log error to service here
        // console.error(error, info)
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback ?? <div>Something went wrong.</div>
        }
        return this.props.children
    }
}