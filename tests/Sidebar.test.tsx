import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../src/App";

describe("Sidebar", () => {
    beforeEach(() => {
        render(<App />)
    })
    
    it("should add a new note upon pressing Create one now", async () => {
        const button = screen.getByRole("button", { name: /Create one now/i })
        userEvent.click(button)
        const note = await waitFor(() => screen.getByText("# Type your markdown note's title here"))
        expect(note).toBeInTheDocument()
    })
    
})
