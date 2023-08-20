import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { Box, Typography, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import { useMediaQuery } from "@mui/material";

const UserPostInfo = ({
  authorId,
  name,
  subtitle,
  pictureKey,
  time = null,
  isPost = true,
}) => {
  const navigate = useNavigate();
  const loggedInUserId = useSelector((state) => state.user.user._id);
  const token = useSelector((state) => state.user.token);
  const friends = useSelector((state) => state.user.user.friends);

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const isDesktopScreen = useMediaQuery("(min-width:1000px)");

  const isFriend = friends.find((friend) => friend._id === authorId);
  const isSelf = authorId === loggedInUserId;

  return (
    <FlexBetween>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          gap: "1rem",
        }}
      >
        <UserImage
          pictureKey={pictureKey}
          size="55px"
          isSelf={isSelf}
          isPost={isPost}
          isFriend={isFriend}
          authorId={authorId}
        />
        <Box
          sx={{ width: "100%" }}
          onClick={() => {
            navigate(`/profile/${authorId}`);
            /* TODO: Investigate hack */
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              minwidth: "100%",
              flexDirection: "row",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "0.25rem",
              }}
            >
              <Typography
                color={main}
                variant="h5"
                fontWeight="500"
                sx={{
                  "&:hover": {
                    color: palette.primary.light,
                    cursor: "pointer",
                  },
                }}
              >
                {name}
              </Typography>
            </Box>
            {time ? (
              <>
                <Box
                  sx={{
                    display: "flex",
                    gap: "0.1rem",
                    flexDirection: "row",
                    alignItems: "center",
                    color: palette.neutral.mediumMain,
                  }}
                >
                  <AccessTimeIcon />
                  <Typography variant="h7" fontWeight="300">
                    {time}
                  </Typography>
                </Box>
              </>
            ) : null}
          </Box>
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </Box>
    </FlexBetween>
  );
};

export { UserPostInfo as FriendInfo };
export default UserPostInfo;
