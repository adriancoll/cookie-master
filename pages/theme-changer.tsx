import React, { ChangeEvent, useEffect, useState } from "react";

import {
  Button,
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

import axios from "axios";
import { Layout } from "../components/layotus";
import Cookies from "js-cookie";

export type Themes = 'light' | 'dark' | 'custom'

type Props = {
  theme: Themes;
};

const ThemeChangerPage: NextPage<Props> = ({ theme }) => {
  const [currentTheme, setCurrentTheme] = useState(theme);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value: selectedTheme } = event.target;

    setCurrentTheme(selectedTheme as Themes);
 
    Cookies.set("theme", selectedTheme);
  };

  const onClick = async () => {
    const { data } = await axios.get("/api/hello");

    setCurrentTheme(theme);
  };

  useEffect(() => {}, []);

  return (
    <Layout>
      <Card>
        <CardContent>
          <FormControl>
            <FormLabel>Tema</FormLabel>
            <RadioGroup row onChange={handleChange} value={currentTheme}>
              <FormControlLabel
                value="light"
                label="Light"
                control={<Radio />}
              />
              <FormControlLabel value="dark" label="Dark" control={<Radio />} />
              <FormControlLabel
                value="custom"
                label="Custom"
                control={<Radio />}
              />
            </RadioGroup>
          </FormControl>

          <Button onClick={onClick}>Request</Button>
        </CardContent>
      </Card>
    </Layout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
import { GetServerSideProps, NextPage } from "next";

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { theme = "light" } = req.cookies;

  const validThemes = ["light", "dark", "custom"];

  return {
    props: {
      theme: validThemes.includes( theme ) ? theme : 'dark'
    },
  };
};

export default ThemeChangerPage;
