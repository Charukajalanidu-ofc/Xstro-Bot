@echo off
setlocal enabledelayedexpansion

REM Navigate to your Git repository directory
cd /d "path\to\your\git\repository"

REM Loop through each file in the directory and subdirectories
for /r %%F in (*) do (
    REM Check if the item is a file (not a directory)
    if not exist "%%F\" (
        REM Add all untracked files
        git add -N .

        REM Add the file to the staging area
        git add "%%F"

        REM Commit the file
        git commit -m "Added %%~nxF"

        REM Push the commit to remote
        git push

        REM Output success message
        echo Pushed: "%%~nxF"
        echo.
    )
)

REM End of script
echo All files pushed individually.
pause