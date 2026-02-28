@echo off
REM =====================================================
REM PathPilot AI - Domain & Role Data Migration
REM =====================================================
REM This script executes the new domain and role seed data
REM =====================================================

echo ================================================
echo PathPilot AI - Domain and Role Data Migration
echo ================================================
echo.
echo WARNING: This will DELETE all existing:
echo - Domains
echo - Roles
echo - User Progress
echo - Roadmap Tasks
echo - Roadmap Phases
echo.
echo Press Ctrl+C to cancel, or
pause

echo.
echo Executing migration...
echo.

REM Execute the SQL migration script
mysql -h localhost -u root -pSanjai@2005 career_navigator < database\seed_domains_roles_v2.sql

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ================================================
    echo Migration completed successfully!
    echo ================================================
    echo.
    echo Verification queries:
    echo.
    
    REM Count domains
    echo Counting domains...
    mysql -h localhost -u root -pSanjai@2005 career_navigator -e "SELECT COUNT(*) as 'Total Domains' FROM domains;"
    echo.
    
    REM Count roles
    echo Counting roles...
    mysql -h localhost -u root -pSanjai@2005 career_navigator -e "SELECT COUNT(*) as 'Total Roles' FROM roles;"
    echo.
    
    REM Show domain distribution
    echo Domain distribution:
    mysql -h localhost -u root -pSanjai@2005 career_navigator -e "SELECT d.name as 'Domain', COUNT(r.id) as 'Roles' FROM domains d LEFT JOIN roles r ON d.id = r.domain_id GROUP BY d.id, d.name ORDER BY d.id;"
    echo.
    
    echo ================================================
    echo Next steps:
    echo 1. Restart your backend server (if running)
    echo 2. Test the APIs at http://localhost:5000/api/domains
    echo 3. Test role selection in the UI
    echo ================================================
) else (
    echo.
    echo ================================================
    echo ERROR: Migration failed!
    echo ================================================
    echo Please check:
    echo 1. MySQL service is running
    echo 2. Database credentials are correct
    echo 3. Database 'career_navigator' exists
    echo ================================================
)

echo.
pause
