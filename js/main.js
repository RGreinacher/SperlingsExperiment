var TIME_TO_SHOW_HIGHLIGHTED_INPUTS = 500,
    DURATION_MATRIX_IS_VISIBLE = 50;
var alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
    lettersInMatrix = [[], [], []];
var challengeRow,
    challengeColumn;
var modusTotalRow = true;
var roundsPlayed = 0,
    roundsWon = 0;

$('#no-js-warning').remove();
resetSperlingsExperiment();

$('#startRowButton').click(function (event) {
    modusTotalRow = true;
    $('#numberOfFields').html(4);
    startSperlingsExperiment();
    event.preventDefault();
});

$('#startSingleFieldButton').click(function (event) {
    modusTotalRow = false;
    $('#numberOfFields').html(1);
    startSperlingsExperiment();
    event.preventDefault();
});

$('#resultButton').click(function (event) {
    showSolution();
    event.preventDefault();
});

function resetSperlingsExperiment() {
    for (i = 0; i < 3; i++) {
        for (j = 0; j < 4; j++) {
            $('#row' + i + 'letter' + j).unbind();
            $('#row' + i + 'letter' + j).removeClass('highlighted-input');
            $('#row' + i + 'letter' + j).addClass('default-input');

            randomLetter = Math.floor(Math.random() * 26);
            $('#row' + i + 'letter' + j).val(alphabet[randomLetter]);
            lettersInMatrix[i][j] = alphabet[randomLetter];
        }
    }

    hideMatrix();
    $('#resultButton').css('visibility', 'hidden');
    $('#anchorman').html('+');
    $('#anchorman').css('color', '#FFFFFF');
    $('#corretFieldsSign').html(0);
}

function startSperlingsExperiment() {
    resetSperlingsExperiment();
    $('#anchorman').css('color', '#CCCCCC');

    setTimeout(function () {
        $('#anchorman').css('color', '#AAAAAA');

        setTimeout(function () {
            $('#anchorman').css('color', '#777777');

            setTimeout(function () {
                showMatrixFor50ms();
            }, 1000);

        }, 1000);

    }, 1000);
}

function showMatrix() {
    $('#anchorman').css('display', 'none');
    $('.row0-letters, .row1-letters, .row2-letters').css('visibility', 'visible');
    $('.row1-letters').css('display', 'block');
}

function hideMatrix() {
    $('.row0-letters, .row1-letters, .row2-letters').css('visibility', 'hidden');
    $('.row1-letters').css('display', 'none');
    $('#anchorman').css('display', 'block');
}

function hideLettersAndAnchorman() {
    $('.row0-letters, .row1-letters, .row2-letters').css('visibility', 'hidden');
    $('.row1-letters').css('display', 'block');
    $('#anchorman').css('display', 'none');
}

function clearMatrix() {
    for (i = 0; i < 3; i++) {
        for (j = 0; j < 4; j++) {
            $('#row' + i + 'letter' + j).val('');
        }
    }
}

function showMatrixFor50ms() {
    showMatrix();
    setTimeout(function () {
        hideMatrix();
        $('#anchorman').html('&nbsp;'); // ;o)

        setTimeout(function () {
            askForLetters();
        }, TIME_TO_SHOW_HIGHLIGHTED_INPUTS);

    }, DURATION_MATRIX_IS_VISIBLE);
}

function askForLetters() {
    challengeRow = Math.floor(Math.random() * 3);

    clearMatrix();
    hideLettersAndAnchorman();

    $('.row' + challengeRow + '-letters').css('visibility', 'visible');
    if (modusTotalRow) {
        for (i = 0; i < 4; i++) {
            $('#row' + challengeRow + 'letter' + i).removeClass('default-input').addClass('highlighted-input');
        }
        $('#row' + challengeRow + 'letter0').focus();

    } else {
        challengeColumn = Math.floor(Math.random() * 4);
        $('#row' + challengeRow + 'letter' + challengeColumn).removeClass('default-input').addClass('highlighted-input');
        $('#row' + challengeRow + 'letter' + challengeColumn).focus();
    }

    $('#resultButton').css('visibility', 'visible');
}

function showSolution() {
    var allInputsAreCorrect = true;
    var correctInputFields = 0;

    for (i = 0; i < 3; i++) {
        for (j = 0; j < 4; j++) {
            if (i == challengeRow) {
                if (modusTotalRow) {
                    if ($('#row' + challengeRow + 'letter' + j).val().toUpperCase() != lettersInMatrix[challengeRow][j]) {
                        allInputsAreCorrect = false;
                    } else {
                        correctInputFields += 1;
                    }

                } else if (j == challengeColumn) {
                    if ($('#row' + challengeRow + 'letter' + j).val().toUpperCase() != lettersInMatrix[challengeRow][j]) {
                        allInputsAreCorrect = false;
                    } else {
                        correctInputFields += 1;
                    }
                }
            }

            $('#row' + i + 'letter' + j).val(lettersInMatrix[i][j]);
        }
    }

    showMatrix();
    roundsPlayed += 1;

    if (allInputsAreCorrect) {
        roundsWon += 1;
        $('#corretRoundsSign').html(roundsWon);
        $('#playedRoundsSign').html(roundsPlayed);
        $('#corretFieldsSign').html(correctInputFields);
        alert('Toll! Du hast dich richtig erinnert!');
    } else {
        $('#playedRoundsSign').html(roundsPlayed);
        $('#corretFieldsSign').html(correctInputFields);
        alert('Leider nicht ganz richtig.');
    }
}
