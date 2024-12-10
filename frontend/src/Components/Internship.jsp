<!-- internship.jsp -->
<%@ page contentType="text/html; charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Internship Opportunities</title>
    <link rel="stylesheet" type="text/css" href="<c:url value='/css/style.css'/>">
</head>
<body>
    <jsp:include page="navbar.jsp" /> <!-- Include Navbar if you have one -->

    <div class="internship-container">
        <h1>Internship Opportunities</h1>
        <p>Explore various internship opportunities with EduVerse Academy!</p>
        
        <section id="internship-details">
            <h2>Current Internships</h2>
            <div class="internship-box">
                <div class="internship">
                    <h3>Software Development Internship</h3>
                    <p>Work on cutting-edge technology and improve your programming skills.</p>
                    <p>Location: Remote</p>
                    <p>Duration: 3 months</p>
                    <button>Apply Now</button>
                </div>
                <div class="internship">
                    <h3>Marketing Internship</h3>
                    <p>Enhance your digital marketing skills while promoting an innovative platform.</p>
                    <p>Location: Remote</p>
                    <p>Duration: 2 months</p>
                    <button>Apply Now</button>
                </div>
            </div>
        </section>
    </div>

    <jsp:include page="footer.jsp" /> <!-- Include Footer if you have one -->
</body>
</html>