import React, { useEffect, useState } from "react";
import styles from "./Header.module.scss";
import staticData from "../../constants/staticData.json";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import {
  Badge,
  Box,
  Button,
  CssBaseline,
  Grid,
  SvgIcon,
  useScrollTrigger,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import favoriteIcon from "../../assets/icons/favorite.svg";
import favoriteFilledIcon from "../../assets/icons/favorite-filled.svg";
import factSoftIcon from "../../assets/icons/facts-soft.svg";
import cartIcon from "../../assets/icons/cart.svg";
import styled from "@emotion/styled";

//Header scroll elevation
const ElevationScroll = (props) => {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
};

//Animation for cart icon
const AnimatedBadge = styled(Badge)`
  animation: ${({ animate }) =>
    animate ? "scaleUp 0.3s ease-in-out" : "none"};
  transform-origin: center;

  @keyframes scaleUp {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }
`;

const Header = (props) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [animateBadge, setAnimateBadge] = useState(false);

  useEffect(() => {
    // Trigger the animation by setting animateBadge to true
    setAnimateBadge(true);

    // Reset animateBadge after the animation duration to prepare for the next click
    setTimeout(() => {
      setAnimateBadge(false);
    }, 300);
  }, [props.cartItemCount]);

  //function for add to cart button click
  const handleAddToCartClick = () => {
    const updatedCartCount = props.cartItemCount + 1;
    //set the updated cart count
    props.setCartItemCount(updatedCartCount);
  };

  return (
    <div className={styles.wrapper}>
      <CssBaseline />
      <ElevationScroll {...props}>
        <AppBar sx={{ borderBottom: "1px solid #d0d0d0" }}>
          <Toolbar className={styles.toolbarWrap}>
            <Grid container alignItems="center">
              <Grid item xs={12} sm={6}>
                <Typography
                  variant="h6"
                  component="div"
                  className={styles.title}
                >
                  {staticData.article.title}
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                container
                justifyContent="flex-end"
                alignItems="center"
                className={styles.headerMenu}
              >
                {!props.isCartButtonVisible && (
                  <>
                    <Box sx={{ color: "#414141", marginRight: "1rem" }}>
                      <div className={styles.quantityBox}>
                        <div>1</div>
                      </div>
                      <div>{staticData.article.unit}</div>
                    </Box>
                    <Box>
                      <Button
                        variant="contained"
                        className={styles.cartButton}
                        startIcon={<AddIcon />}
                        onClick={handleAddToCartClick}
                      >
                        Add to cart
                      </Button>
                    </Box>
                  </>
                )}
                <Box>
                  <Box sx={{ marginRight: "0.7rem" }}>
                    {!isFavorite ? (
                      <SvgIcon
                        component={favoriteIcon}
                        sx={{
                          fontSize: "1.3rem",
                          marginRight: "0.5rem",
                          color: "#a7a7a7",
                          cursor: "pointer",
                        }}
                        inheritViewBox
                        onClick={() => setIsFavorite(true)}
                      />
                    ) : (
                      <SvgIcon
                        component={favoriteFilledIcon}
                        sx={{
                          fontSize: "1.3rem",
                          marginRight: "0.5rem",
                          fill: "#de554a",
                          color: "#a7a7a7",
                          cursor: "pointer",
                        }}
                        inheritViewBox
                        onClick={() => setIsFavorite(false)}
                      />
                    )}
                    <SvgIcon
                      component={factSoftIcon}
                      sx={{ color: "#a7a7a7", fontSize: "1.7rem" }}
                      inheritViewBox
                    />
                  </Box>
                  <Box
                    sx={{
                      borderLeft: "1px solid rgba(167, 167, 167, 0.5)",
                      padding: "20px 0px 20px 20px",
                      minHeight: "4rem",
                      cursor: "pointer",
                    }}
                  >
                    <AnimatedBadge
                      badgeContent={props.cartItemCount}
                      color="secondary"
                      className={styles.customBadgeStyle}
                      animate={animateBadge}
                    >
                      <SvgIcon
                        component={cartIcon}
                        sx={{ fontSize: "1.2rem", color: "#a7a7a7" }}
                        inheritViewBox
                      />
                    </AnimatedBadge>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
    </div>
  );
};

export default Header;
