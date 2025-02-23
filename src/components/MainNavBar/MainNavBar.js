import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { changeLanguage } from "i18next";
import { useTranslation } from "react-i18next";
import cookies from "js-cookie";

import "./MainNavBar.css";
import languages from "config/languages";
import headerIcon from "../../assets/media/space-fighter-96.png";

function MainNavBar({
  sections = [],
  state = null,
  fullpageApi,
  activeSection = "",
}) {
  const { t } = useTranslation();

  const currentLanguageCode = cookies.get("i18next") || "en";
  const currentLanguage = languages.find((l) => l.code === currentLanguageCode);

  useEffect(() => {}, [currentLanguage]);

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
      sticky="top"
      id="main-menu"
    >
      <Container>
        {/* LOGO */}
        <Navbar.Brand
          style={{ cursor: "pointer" }}
          onClick={() => fullpageApi.moveTo(1)}
        >
          <img
            src={headerIcon}
            className="logo d-inline-block align-top"
            alt="hung nguyen logo"
          />
          <strong id="logo-username" className="logo">
            HUNG
          </strong>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        {/* NAV ITEMS */}
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto" id="main-menu">
            {sections.map(({ id, name }, index) => {
              return (
                <Nav.Link
                  onClick={() => fullpageApi.moveTo(index + 2)}
                  key={id}
                  className={activeSection === id ? "active" : ""}
                >
                  {name}
                </Nav.Link>
              );
            })}
          </Nav>

          {/* CHANGE LANG */}
          <Nav>
            <NavDropdown
              title={t("language")}
              id="collasible-nav-dropdown"
              align="end"
              menuVariant="dark"
            >
              <NavDropdown.Header>{t("language")}</NavDropdown.Header>

              {languages.map(({ code, name, country_code }) => (
                <NavDropdown.Item
                  key={code}
                  onClick={() => changeLanguage(code)}
                  disabled={code === currentLanguageCode}
                >
                  <span
                    className={`flag-icon flag-icon-${country_code} mx-2`}
                    style={{ opacity: code === currentLanguageCode ? 0.5 : 1 }}
                  ></span>
                  {name}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MainNavBar;
