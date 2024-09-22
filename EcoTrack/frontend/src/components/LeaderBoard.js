import React, { useEffect, useState } from 'react';
import axios from 'axios';

function LeaderBoard() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v4/users/getAllUsers`, { withCredentials: true });
                const data = response.data;
                console.log(data);
                if (data && data.data) {
                    setUsers(data.data); // Assuming 'data.data' is an array of user objects
                }
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };
        fetchUsers();
    }, []);

    const calculatePoints = (index) => {
        return 50 - index * 2; // Example: decrease points by 50 for each subsequent user
    };

    // Define background colors for top three users
    const backgroundColors = ['gold', 'silver', '#cd7f32']; // Bronze is represented by #cd7f32

    return (
        <div style={{
            backgroundImage: `
                radial-gradient(circle at top right, rgba(138, 43, 226, 0.4), transparent 50%),
                radial-gradient(circle at bottom left, rgba(138, 43, 226, 0.4), transparent 50%)
            `,
            backgroundColor: '#121212',
            height: "100vh"
        }}>
            <div style={styles.container}>
                <h2 style={styles.title}>LeaderBoard</h2>
                <div style={styles.leaderBoardWrapper}>
                    <div style={styles.topThreeContainer}>
                        {users.slice(0, 3).map((user, index) => (
                            <div
                                key={index}
                                style={{
                                    ...styles.leaderBoardItem,
                                    ...styles.topThree,
                                    ...styles[`top${index + 1}`],
                                    backgroundColor: backgroundColors[index] // Apply the background color
                                }}
                            >
                                <span style={styles.rank}>{index + 1}.</span>
                                <span style={styles.name}>{user.fullName}</span>
                                <span style={styles.points}>{calculatePoints(index)} pts</span>
                            </div>
                        ))}
                    </div>
                    <div style={styles.restContainer}>
                        {users.slice(3).map((user, index) => (
                            <div key={index + 3} style={styles.leaderBoardItem}>
                                <span style={styles.rank}>{index + 4}.</span>
                                <span style={styles.name}>{user.fullName}</span>
                                <span style={styles.points}>{calculatePoints(index + 3)} pts</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        transform: "translateY(90px)",
        padding: '20px',
        backgroundColor: "transparent",
        borderRadius: '15px',
        width: '80%',
        margin: '0 auto',
        animation: 'fadeIn 1s ease-in-out',
    },
    title: {
        fontSize: '2.8rem',
        marginBottom: '20px',
        color: 'aqua',
        textAlign: 'center',
        animation: 'slideInDown 1.2s ease-in-out',
        fontFamily: '"Poppins", sans-serif',
    },
    leaderBoardWrapper: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
    },
    topThreeContainer: {
        flex: 1,
        marginRight: '20px',
        alignItems: "center",
        display: 'flex',
        flexDirection: 'column',
        gap: "40px",
    },
    restContainer: {
        flex: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        height: "71vh",
        overflow: "scroll"
    },
    leaderBoardItem: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '15px 25px',
        margin: '8px 0',
        background: 'linear-gradient(135deg, #fff, #f9f9f9)',
        borderRadius: '12px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.3s ease, background 0.3s ease',
        fontFamily: '"Poppins", sans-serif',
        cursor: 'pointer',
        width: "90%",
        backgroundColor: "violet"
    },
    rank: {
        fontSize: '1.8rem',
        fontWeight: '600',
        color: '#555',
    },
    name: {
        fontSize: '1.6rem',
        color: '#333',
        flex: 1,
        textAlign: 'center',
    },
    points: {
        fontSize: '1.6rem',
        color: "#111",
    },
    topThree: {
        fontWeight: 'bold',
        color: '#fff',
        transform: 'scale(1.1)',
        borderRadius: '15px',
        position: 'relative',
        overflow: 'hidden',
    },
    top1: {
        border: '4px solid',
        borderColor: '#ffd700',
        animation: 'rotateColors1 5s linear infinite',
    },
    top2: {
        border: '4px solid',
        borderColor: '#c0c0c0',
        animation: 'rotateColors2 5s linear infinite',
    },
    top3: {
        border: '4px solid',
        borderColor: '#cd7f32',
        animation: 'rotateColors3 5s linear infinite',
    },
    noUsers: {
        fontSize: '1.2rem',
        color: '#888',
        textAlign: 'center',
        marginTop: '20px',
    },
    '@keyframes slideInDown': {
        from: {
            transform: 'translateY(-50px)',
            opacity: 0,
        },
        to: {
            transform: 'translateY(0)',
            opacity: 1,
        }
    },
    '@keyframes fadeIn': {
        from: {
            opacity: 0,
        },
        to: {
            opacity: 1,
        }
    },
};

export default LeaderBoard;
