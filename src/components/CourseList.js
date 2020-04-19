import React, { useState } from "react";
import * as contentful from "contentful";
import { Grid, TextField } from "@material-ui/core";

import Course from "../components/Course";

const SPACE_ID = "[CONTENTFUL SPACE ID]";
const ACCESS_TOKEN = "[CONTENTFUL ACCESS TOKEN]";

const client = contentful.createClient({
  space: "egihpg6tlcyc",
  accessToken: "nr7ztcSKLJl3qnMkI3W9yBOxlznsy5ynMa6wAzfvs_8",
});

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [searchString, setSearchString] = useState("");

  const getCourses = () => {
    client
      .getEntries({
        content_type: "course",
        query: searchString,
      })
      .then((response) => {
        setCourses([...response.items]);
        console.log(courses);
      })
      .catch((error) => {
        console.log("Error while fetching entries:");
        console.error(error);
      });
  };

  const onSearchInputChange = (event) => {
    console.log(`Search changed to ${event.target.value}`);
    setSearchString(event.target.value ? event.target.value : "");
    getCourses();
  };

  return (
    <div>
      {courses ? (
        <div>
          <TextField
            style={{ padding: 24 }}
            id="searchInput"
            placeholder="Search for Courses"
            margin="normal"
            onChange={onSearchInputChange}
          />
          <Grid container spacing={24} style={{ padding: 24 }}>
            {courses.map((course) => (
              <Grid item xs={12} sm={6} lg={4}>
                <Course course={course} />
              </Grid>
            ))}
          </Grid>
        </div>
      ) : (
        "No Courses Found"
      )}
    </div>
  );
};

export default CourseList;
