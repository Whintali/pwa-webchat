import type { Meta, StoryObj } from "@storybook/react";
import NavBarComponent from "../app/components/Navbar";

const meta: Meta<typeof NavBarComponent> = {
    title: "Components/Navbar",
    component: NavBarComponent,
    parameters: {
        layout: "fullscreen",
        nextjs: {
            appDirectory: true,
            navigation: {
                pathname: "/",
            },
        },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
