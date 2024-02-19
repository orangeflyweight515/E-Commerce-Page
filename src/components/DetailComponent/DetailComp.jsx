import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Rating,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import packageImg from "../../assets/icons/package.svg";
import zoomIn from "../../assets/icons/zoom-in.svg";
import zoomOut from "../../assets/icons/zoom-out.svg";
import discountIcon from "../../assets/icons/discount.svg";
import AddIcon from "@mui/icons-material/Add";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import attachmentIcon from "../../assets/icons/attachment.svg";
import styles from "./DetailComp.module.scss";
import staticData from "../../constants/staticData.json";

const DetailComp = ({
  imageUrl,
  setIsCartButtonVisible,
  cartItemCount,
  setCartItemCount,
}) => {
  const [zoomLevel, setZoomLevel] = useState(100); //state to set zoom level
  const [isZoomed, setIsZoomed] = useState(false); //state to set is image zoomed in or out

  //useEffect to check detail add to cart button visible or not
  useEffect(() => {
    const handleScroll = () => {
      // Check if the section button is in view
      const sectionButton = document.getElementById("sectionAddToCartButton");
      const sectionButtonRect = sectionButton?.getBoundingClientRect();
      const isSectionButtonInView =
        sectionButtonRect.top >= 0 &&
        sectionButtonRect.bottom <= window.innerHeight;

      // Update state based on the visibility of the section button
      setIsCartButtonVisible(isSectionButtonInView);
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  //function to handle zoom in
  const handleZoomIn = () => {
    setZoomLevel((prevZoomLevel) => Math.min(prevZoomLevel + 50, 200));
    setIsZoomed(true);
  };

  //function to handle zoom out
  const handleZoomOut = () => {
    setZoomLevel((prevZoomLevel) => Math.max(prevZoomLevel - 50, 50));
    setIsZoomed(false);
  };

  //function for add to cart button click
  const handleAddToCartClick = () => {
    const updatedCartCount = cartItemCount + 1;
    //set the updated cart count
    setCartItemCount(updatedCartCount);
  };

  return (
    <>
      {/* Details section starts Here */}
      <Grid container className={styles.wrapper}>
        <Grid container p={3} mb={8} spacing={7}>
          {/* Product Images and Image viewer starts Here */}
          <Grid item xs={1.2}>
            <Box className={styles.imgBox}>
              <div className={styles.content}>
                {imageUrl ? (
                  <img src={imageUrl} alt="Content" />
                ) : (
                  <SvgIcon
                    component={packageImg}
                    sx={{ fontSize: "2.3rem", color: "#d0d0d0" }}
                    inheritViewBox
                  />
                )}
              </div>
            </Box>
            <br />
            <Box className={styles.imgBox}>
              <div className={styles.content}>
                {imageUrl ? (
                  <img src={imageUrl} alt="Content" />
                ) : (
                  <SvgIcon
                    component={packageImg}
                    sx={{ fontSize: "2.3rem", color: "#d0d0d0" }}
                    inheritViewBox
                  />
                )}
              </div>
            </Box>
          </Grid>

          <Grid item xs={4}>
            <Box className={styles.viewBox}>
              <div className={styles.content}>
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="Zoomable Image"
                    style={{
                      width: `${zoomLevel}%`,
                      height: "auto",
                      transition: "width 0.5s ease",
                    }}
                  />
                ) : (
                  <SvgIcon
                    component={packageImg}
                    sx={{ fontSize: "7rem", color: "#d0d0d0" }}
                    inheritViewBox
                  />
                )}

                {!isZoomed ? (
                  <SvgIcon
                    inheritViewBox
                    component={zoomIn}
                    sx={{
                      position: "absolute",
                      bottom: "10px",
                      right: "10px",
                      color: "#a7a7a7",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onClick={handleZoomIn}
                  />
                ) : (
                  <SvgIcon
                    inheritViewBox
                    component={zoomOut}
                    sx={{
                      position: "absolute",
                      bottom: "10px",
                      right: "10px",
                      color: "#a7a7a7",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onClick={handleZoomOut}
                  />
                )}
              </div>
            </Box>
          </Grid>
          {/* Product Images and Image viewer Ends Here */}

          {/* Product Title Price etc and Add to Cart button Starts Here */}
          <Grid item xs={12} sm container className={styles.articleInfo}>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography
                  variant="subtitle1"
                  fontWeight={500}
                  maxWidth={400}
                  component="div"
                >
                  {staticData.article.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  by&nbsp;
                  <Link
                    href={staticData.article.supplier_link}
                    underline="none"
                    sx={{ color: "#1476af" }}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {staticData.article.supplier_name}
                  </Link>
                </Typography>
                <Rating
                  name="half-rating-read"
                  defaultValue={staticData.article.stars}
                  precision={0.5}
                  readOnly
                  sx={{ marginBottom: "15px" }}
                />
                <Typography
                  variant="subtitle1"
                  display={"flex"}
                  alignItems={"center"}
                  fontWeight={500}
                >
                  {`${staticData.article.price} ${staticData.article.currency}`}
                  &nbsp;
                  <Typography
                    variant="body2"
                    sx={{ display: "inline-block", marginRight: "10px" }}
                    color="text.secondary"
                  >
                    {`+ ${staticData.article.transport_costs} ${staticData.article.currency} shipping`}
                  </Typography>
                  <SvgIcon
                    component={discountIcon}
                    sx={{ fontSize: "1.1rem" }}
                    inheritViewBox
                  />
                </Typography>
                <Typography variant="p" color="text.secondary">
                  {" "}
                  {`all prices incl.${staticData.article.vat_percent} % taxes`}{" "}
                </Typography>
              </Grid>

              <Grid
                item
                className={styles.addToCart}
                id="sectionAddToCartButton"
              >
                <Box
                  sx={{
                    color: "#414141",
                    marginRight: "1rem",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
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
              </Grid>
            </Grid>
          </Grid>
          {/* Product Title Price etc and Add to Cart button Ends Here */}
        </Grid>

        <Grid container sx={{ backgroundColor: "#efefef" }} p={3} spacing={5}>
          {/* Product Description starts Here */}
          <Grid
            item
            container
            xs={10}
            sx={{ paddingTop: "20px !important" }}
            wrap="nowrap"
          >
            <Grid item>
              <Typography
                variant="h6"
                fontSize={15}
                color={"#de554a"}
                gutterBottom
              >
                DESCRIPTION
              </Typography>
              <Grid item xs zeroMinWidth>
                <Typography
                  mb={1}
                  variant="subtitle1"
                  display={"inline-block"}
                  fontSize={14}
                  fontWeight={500}
                >
                  {staticData.article.description_short}
                </Typography>
                <Typography
                  variant="subtitle1"
                  display={"inline-block"}
                  fontSize={14}
                  fontWeight={500}
                >
                  {staticData.article.description_long}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          {/* Product Description ends Here */}

          <Grid item container xs={10} spacing={3} wrap="nowrap">
            {/* Product Details Card starts Here */}
            <Grid item xs={6}>
              <Card variant="outlined" sx={{ maxHeight: "360px" }}>
                <CardContent>
                  <Typography
                    variant="h6"
                    fontSize={15}
                    color={"#de554a"}
                    gutterBottom
                  >
                    DETAILS
                  </Typography>
                  <Box borderBottom="1px solid #d0d0d0" mb={1.5} />

                  <Box mb={1.5}>
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      fontSize={15}
                      fontWeight={500}
                    >
                      Features
                    </Typography>
                    <List dense={false} sx={{ padding: "0" }}>
                      {Object.entries(staticData.article.features).map(
                        ([feature, value]) => (
                          <ListItem sx={{ padding: "0" }}>
                            <ListItemIcon sx={{ minWidth: "25px" }}>
                              <FiberManualRecordIcon
                                sx={{ color: "black", fontSize: "12px" }}
                              />
                            </ListItemIcon>
                            <ListItemText
                              primary={
                                <>
                                  <Typography
                                    variant="subtitle1"
                                    display={"inline-block"}
                                    color="text.secondary"
                                    fontSize={15}
                                    fontWeight={500}
                                    mr={0.5}
                                  >{`${feature}:`}</Typography>
                                  <Typography
                                    variant="subtitle1"
                                    display={"inline-block"}
                                    fontSize={15}
                                    fontWeight={500}
                                  >
                                    {value}
                                  </Typography>
                                </>
                              }
                              sx={{ margin: "0" }}
                            />
                          </ListItem>
                        )
                      )}
                    </List>
                  </Box>

                  <Box mb={1.5}>
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      fontSize={15}
                      fontWeight={500}
                    >
                      Attachments
                    </Typography>
                    <List dense={false} sx={{ padding: "0" }}>
                      {staticData.article.attachments.map((attachment) => (
                        <ListItem sx={{ padding: "0" }}>
                          <ListItemIcon sx={{ minWidth: "25px" }}>
                            <SvgIcon
                              component={attachmentIcon}
                              sx={{ fontSize: "1rem", fill: "black" }}
                              inheritViewBox
                            />
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Link
                                href={attachment.file_link}
                                underline="none"
                                color={"#1476af"}
                                fontSize={15}
                                fontWeight={500}
                                sx={{ opacity: 0.7 }}
                                target="_blank"
                                rel="noreferrer"
                              >
                                {attachment.file_label}
                              </Link>
                            }
                            sx={{ margin: "0" }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Box>

                  <Box>
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      fontSize={15}
                      fontWeight={500}
                      gutterBottom
                    >
                      Keywords
                    </Typography>
                    <List
                      dense={false}
                      sx={{
                        padding: "0",
                        display: "flex",
                        width: "100%",
                        flexWrap: "wrap",
                      }}
                    >
                      {staticData.article.keywords.map((keyword) => (
                        <ListItem
                          sx={{
                            padding: "0",
                            width: "auto",
                            marginRight: "10px",
                            marginBottom: "10px",
                          }}
                        >
                          <Stack direction="row" spacing={1}>
                            <Chip
                              sx={{
                                backgroundColor: "#ced4db",
                                color: "white",
                                fontWeight: "500",
                              }}
                              label={keyword.toLocaleUpperCase()}
                            />
                          </Stack>
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            {/* Product Details Card ends Here */}

            {/* Product Pricing and Shipping Card starts Here */}
            <Grid item xs={6}>
              <Card variant="outlined" sx={{ maxHeight: "360px" }}>
                <CardContent>
                  <Typography
                    variant="h6"
                    fontSize={15}
                    color={"#de554a"}
                    gutterBottom
                  >
                    PRICING & SHIPPING
                  </Typography>
                  <Box borderBottom="1px solid #d0d0d0" mb={1.5} />

                  <Grid item xs mb={9}>
                    <List dense={false} sx={{ padding: "0" }}>
                      <ListItem sx={{ padding: "0" }}>
                        <ListItemIcon sx={{ minWidth: "25px" }}>
                          <FiberManualRecordIcon
                            sx={{ color: "black", fontSize: "12px" }}
                          />
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <>
                              <Typography
                                variant="subtitle1"
                                display={"inline-block"}
                                color="text.secondary"
                                fontSize={15}
                                fontWeight={500}
                                mr={0.5}
                              >
                                Minimum order:
                              </Typography>
                              <Typography
                                variant="subtitle1"
                                display={"inline-block"}
                                fontSize={15}
                                fontWeight={500}
                              >
                                {staticData.article.minimum_order_quantity}{" "}
                                {staticData.article.unit}
                              </Typography>
                            </>
                          }
                          sx={{ margin: "0" }}
                        />
                      </ListItem>
                      <ListItem sx={{ padding: "0" }}>
                        <ListItemIcon sx={{ minWidth: "25px" }}>
                          <FiberManualRecordIcon
                            sx={{ color: "black", fontSize: "12px" }}
                          />
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <>
                              <Typography
                                variant="subtitle1"
                                display={"inline-block"}
                                color="text.secondary"
                                fontSize={15}
                                fontWeight={500}
                                mr={0.5}
                              >
                                Shipping:
                              </Typography>
                              <Typography
                                variant="subtitle1"
                                display={"inline-block"}
                                fontSize={15}
                                fontWeight={500}
                              >
                                {`680.96 ${staticData.article.unit}`}
                              </Typography>
                            </>
                          }
                          sx={{ margin: "0" }}
                        />
                      </ListItem>
                      <ListItem sx={{ padding: "0" }}>
                        <ListItemIcon sx={{ minWidth: "25px" }}>
                          <FiberManualRecordIcon
                            sx={{ color: "black", fontSize: "12px" }}
                          />
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <>
                              <Typography
                                variant="subtitle1"
                                display={"inline-block"}
                                color="text.secondary"
                                fontSize={15}
                                fontWeight={500}
                                mr={0.5}
                              >
                                Delivery:
                              </Typography>
                              <Typography
                                variant="subtitle1"
                                display={"inline-block"}
                                fontSize={15}
                                fontWeight={500}
                              >
                                {staticData.article.delivery_time}{" "}
                                {staticData.article.unit}
                              </Typography>
                            </>
                          }
                          sx={{ margin: "0" }}
                        />
                      </ListItem>
                    </List>
                  </Grid>

                  <Grid item width={260}>
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      fontSize={15}
                      fontWeight={500}
                      gutterBottom
                    >
                      Price breaks
                    </Typography>
                    <Box
                      sx={{
                        borderBottom: "1px solid #d0d0d0",
                        margin: "1",
                      }}
                    />
                    {Object.entries(staticData.article.price_breaks).map(
                      ([price, value], index) => (
                        <Box
                          display={"flex"}
                          sx={{
                            borderBottom: "1px solid #d0d0d0",
                          }}
                          justifyContent={"space-around"}
                          pt={0.5}
                          pb={0.5}
                        >
                          <Typography
                            variant="subtitle1"
                            fontSize={15}
                            fontWeight={500}
                          >
                            {`ex ${price} ${staticData.article.unit}`}
                          </Typography>
                          <Typography
                            variant="subtitle1"
                            fontSize={15}
                            fontWeight={500}
                          >
                            {`${value} ${staticData.article.currency}/${staticData.article.unit}`}
                          </Typography>
                        </Box>
                      )
                    )}
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            {/* Product Pricing and Shipping Card ends Here */}
          </Grid>
        </Grid>
      </Grid>
      {/* Details section ends Here */}
    </>
  );
};

export default DetailComp;
