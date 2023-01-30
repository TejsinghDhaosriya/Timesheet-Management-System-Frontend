import React from 'react';
import { render,screen } from '@testing-library/react';
import ProjectsPage from './ProjectsPage';

describe("Project page",()=>{
    test("Page renders correctly",()=>{
        render(<ProjectsPage />)
        // const selement=screen.getByRole("table");
        // expect(selement).toBeInTheDocument();

        // const selement2=screen.getByRole("heading");
        // expect(selement2).toBeInTheDocument();

        const selement3=screen.getByRole("button");
        expect(selement3).toBeInTheDocument();
    });

    // test("input renders correctly",()=>{
    //     render(<ProjectsPage />)
    //     const selement=screen.getByRole("Project")
    //     // console.log(selement);
    //     expect(selement).toBeInTheDocument();
    // });
});