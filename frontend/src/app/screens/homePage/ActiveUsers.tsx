import React from "react";
import { Box, Container, Stack } from "@mui/material";
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import AspectRatio from "@mui/joy/AspectRatio";
import { CssVarsProvider, Typography } from "@mui/joy";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveTopUsers } from "./selector";
import { Product } from "../../../lib/types/product";
import { serverApi } from "../../../lib/config";
import { Member } from "../../../lib/types/member";

// REDUX SLICE & SELECTOR
const topUsersRetriever = createSelector(retrieveTopUsers, (topUsers) => ({
  topUsers,
}));

export default function ActiveUsers() {
  const { topUsers } = useSelector(topUsersRetriever);

  return (
    <>
      {/* TEAM START */}
      <section className="team mt_100 xs_mt_70 pt_95 xs_pt_65 pb_95 xs_pb_65">
        <div className="container">
          <div className="row wow fadeInUp" data-wow-duration="1s">
            <div className="col-md-8 col-lg-7 col-xl-6">
              <div className="section_heading mb_25">
                <h4>Active Users</h4>
                <h2>Active Users</h2>
              </div>
            </div>
          </div>

          <div className="row team_slider">
            {topUsers.length !== 0 ? (
              topUsers.map((member: Member) => {
                const imagePath = `${serverApi}/${member.memberImage}`;
                return (
                  <div
                    className="col-xl-3 wow fadeInUp"
                    data-wow-duration="1s"
                    key={member._id}
                  >
                    <div className="single_team">
                      <div className="single_team_img">
                        <img
                          src={imagePath}
                          alt="team"
                          className="img-fluid w-100"
                        />
                      </div>
                      <div className="single_team_text">
                        <h4> {member.memberNick}</h4>
                        <ul className="d-flex flex-wrap">
                          <li>
                            <a href="#">
                              <i className="fab fa-facebook-f"></i>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i className="fab fa-linkedin-in"></i>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i className="fab fa-twitter"></i>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i className="fab fa-behance"></i>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <Box className="no-data">No active users at the moment!</Box>
            )}
          </div>
        </div>
      </section>
      {/* TEAM END */}
    </>
  );
}
