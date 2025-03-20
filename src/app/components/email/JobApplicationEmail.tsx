import React from "react";

interface JobApplicationEmailProps {
  name: string;
  email: string;
  mobile: string;
  coverLetter: string;
  jobTitle: string;
}

export const JobApplicationEmail = ({
  name,
  email,
  mobile,
  coverLetter,
  jobTitle,
}: JobApplicationEmailProps) => (
  <div>
    <h1>New Job Application for {jobTitle}</h1>
    <p>
      <strong>Name:</strong> {name}
    </p>
    <p>
      <strong>Email:</strong> {email}
    </p>
    <p>
      <strong>Mobile:</strong> {mobile}
    </p>
    <p>
      <strong>Cover Letter:</strong> {coverLetter}
    </p>
  </div>
);
