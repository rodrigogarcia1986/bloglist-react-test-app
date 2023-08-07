import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import AddBlog from "./AddBlog";
import userEvent from "@testing-library/user-event";

test("<AddBlog /> updates parent state and calls onSubmit", async () => {
  const handleAddBlog = jest.fn();

  render(<AddBlog handleAddBlog={handleAddBlog} />);

  const input = screen.getByRole("create");
  const sendButton = screen.getByText("create!");

  const user = userEvent.setup();

  await user.type(input, "testing a form...");
  await user.click(sendButton);

  expect(handleAddBlog.mock.calls).toHaveLength(1);
  expect(handleAddBlog.mock.calls[0][0].content).toBe("testing a form...");

  screen.debug();
});
