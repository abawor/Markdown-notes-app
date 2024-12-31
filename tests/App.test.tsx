import React from "react"
import { it, expect, describe } from "vitest"
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom/vitest"
import App from "../src/App"

describe("App", () => {
    it("should render you have no notes if no notes present", () => {
        render(<App />)

        const heading = screen.getByText("You have no notes")

        expect(heading).toBeInTheDocument()
    })
})
