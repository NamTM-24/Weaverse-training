const complexObj = {
    javascripts: {
        label: "Javascript",
    },

    typescript: {
        label: "typescript",
    },

    reactjs: {
        label: "Reactjs",
    }
};

type complexObj = keyof typeof complexObj;

//Expected : type ComplexObj = "javascript" | "typescript" | "reactjs"