import React from "react"
import { render, screen } from "@testing-library/react"
import App from "../src/App"

describe("App", () => {
    beforeEach(() => {
        render(<App />)
    })
    
    it("should render you have no notes if no notes present", () => {
        const heading = screen.getByText("You have no notes")
        expect(heading).toBeInTheDocument()
    })

    it("render add a new note button", () => {
        const button = screen.getByRole("button", { name: /create one now/i })
        expect(button).toBeInTheDocument()
    })

})
