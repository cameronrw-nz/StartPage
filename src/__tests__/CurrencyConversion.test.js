jest.mock('axios');

import axios from 'axios';
import React from 'react';
import {render, act} from 'react-testing-library';

import CurrencyConversion from "../Widgets/SidePanel/CurrencyConversion";

describe("Currency Component Render", () => {
    it("shows a list of users", async () => {
        const users = {"NZD_THB":{"val":21.45094}};
        const resp = {data: users};
        axios.get.mockResolvedValue(resp);
        expect(axios.get).toHaveBeenCalledTimes(0);
    
        let component;
        
        await act(async () => {
            component =await  render(<CurrencyConversion />);

        });
    
        expect(axios.get).toHaveBeenCalledTimes(1);
        expect(component.container.firstChild).toMatchSnapshot();
    });
  });
