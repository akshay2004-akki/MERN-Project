import React from "react";

const UserProfile = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>New Client Template</h1>

      {/* Client Info Section */}
      <section style={styles.section}>
        <h2 style={styles.subHeading}>Client Information</h2>
        <p><strong>Client Name:</strong> [Client Name]</p>
        <p>
          <strong>Website:</strong>{" "}
          <a href="#" style={styles.link}>
            [Website Link]
          </a>
        </p>
        <p>
          <strong>Social Handle:</strong>{" "}
          <a href="#" style={styles.link}>
            [Social Handle]
          </a>
        </p>
        <p><strong>Needs Help With:</strong> [Details]</p>
      </section>

      {/* Goal Tracker */}
      <section style={styles.section}>
        <h2 style={styles.subHeading}>Goal Tracker</h2>
        <p>
          <a href="https://www.notion.so/Goal-Tracker-14216310956681569e9ae879d01c0700?pvs=21" style={styles.link}>
            Goal Tracker Link
          </a>
        </p>
      </section>

      {/* Overview */}
      <section style={styles.section}>
        <h2 style={styles.subHeading}>Overview</h2>
        <p><strong>What they do:</strong> [Description]</p>
        <p><strong>We do:</strong> [Description]</p>
        <p><strong>Primary Communication:</strong> Email</p>
        <p><strong>Team Lead:</strong> [Team Lead]</p>
      </section>

      {/* Info and Notes */}
      <section style={styles.section}>
        <h2 style={styles.subHeading}>Info and Notes</h2>
        <p>
          <strong>Personal Information:</strong>{" "}
          <a href="https://www.notion.so/Personal-Information-14216310956681dcb600c209f799f05a?pvs=21" style={styles.link}>
            Link
          </a>
        </p>
        <p>
          <strong>Meeting Notes:</strong>{" "}
          <a href="https://www.notion.so/Meeting-Notes-14216310956681d3ad49ef3363342696?pvs=21" style={styles.link}>
            Link
          </a>
        </p>
        <p><strong>Task Files:</strong> [Details]</p>
      </section>

      {/* Contract Information */}
      <section style={styles.section}>
        <h2 style={styles.subHeading}>Contract Information</h2>
        <p><strong>Current Task:</strong> [Task Description]</p>
        <p>
          <strong>Monthly Tasks:</strong>{" "}
          <a href="https://www.notion.so/Monthly-Tasks-142163109566817f91d5d53bd2d7ccac?pvs=21" style={styles.link}>
            Link
          </a>
        </p>
        <p><strong>Time:</strong> [Time] hrs/month</p>
        <p><strong>Contract Period:</strong> [Period]</p>
      </section>
    </div>
  );
};

// Styles
const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    margin: "20px",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
  },
  heading: {
    textAlign: "center",
    color: "#333",
  },
  subHeading: {
    color: "#555",
    marginBottom: "10px",
  },
  section: {
    marginBottom: "20px",
  },
  link: {
    color: "#007BFF",
    textDecoration: "none",
  },
};

export default UserProfile;
