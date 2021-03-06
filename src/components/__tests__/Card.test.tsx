import React from "react";

import Card from "../Card";
import { render, RenderResult } from "~/jestHelpers";

const setup = (
  propOverrides: any = {},
): { props: any; wrapper: RenderResult } => {
  const props = {
    title: "Test Title",
    ...propOverrides,
  };

  const wrapper = render(<Card {...props} />);

  return { props, wrapper };
};

describe("the <Card> component", () => {
  test("matches its snapshot with valid props", () => {
    const { wrapper } = setup();

    expect(wrapper.baseElement.firstElementChild).toMatchSnapshot();
  });
});
