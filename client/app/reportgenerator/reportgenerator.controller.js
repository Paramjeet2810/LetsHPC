export default class ReportGeneratorController {

    tex_string = '';
    iBCDSI = '';
    iBCSPI = '';
    iCoSeCo = '';
    iCoPaCo = '';
    iCoPa = '';
    iThSpu = '';
    iEstSerFra = '';
    iTub = '';
    iNuMA = '';
    iNoCom = '';
    iTCRAProc = '';
    iTCRAProSize = '';
    iSCRA = '';
    iECRA = '';
    iKFRA = '';
    iMSPO = '';
    iMWRA = '';
    iCCRA = '';
    iFSRA = '';
    iSraRA = '';
    iLBRA = '';
    iSyncRA = '';
    iGRA = '';
    iScaRA = '';
    iAOC = '';
    iCBMB = '';
    iADDADA = '';
    iDFIA = '';
    iAAC = '';

    file = {};

    // Data
    execution_time_data = {};
    speedup_data = {};
    karp_flatt_data = {};

    // Chart options
    chart = {};
    chart_image = {};
    chart_options = {};
    execution_time_chart_options = {};
    speedup_chart_options = {};
    karpflatt_chart_options = {};
    active_chart = '';

    // Warning flags
    low_n = false;
    low_p = false;
    low_runs = false;
    no_serial = false;

    // Warning flag thresholds
    n_threshold = 3;
    p_threshold = 2;
    run_threshold = 2;


    constructor($http) {
        this.iBCDSI = '';
        this.iBCSPI = '';
        this.iCoSeCo = '';
        this.iCoPaCo = '';
        this.iCoPa = '';
        this.iThSpu = '';
        this.iEstSerFra = '';
        this.iTub = '';
        this.iNuMA = '';
        this.iNoCom = '';
        this.iTCRAProc = '';
        this.iTCRAProSize = '';
        this.iSCRA = '';
        this.iECRA = '';
        this.iKFRA = '';
        this.iMSPO = '';
        this.iMWRA = '';
        this.iCCRA = '';
        this.iFSRA = '';
        this.iSraRA = '';
        this.iLBRA = '';
        this.iSyncRA = '';
        this.iGRA = '';
        this.iScaRA = '';
        this.iAOC = '';
        this.iCBMB = '';
        this.iADDADA = '';
        this.iDFIA = '';
        this.iAAC = '';

        this.tex_string = `\n\\documentclass[runningheads, a4paper, oribibl]{llncs}\n\n\\setcounter{tocdepth}{3}\n\\usepackage{graphicx}\n\\graphicspath{{../images/}}\n\\usepackage{epstopdf}\n\\usepackage{standalone}\n\\usepackage{xcolor}\n\\usepackage{tikz}\n\\usetikzlibrary{fit}\n\\usetikzlibrary{shapes,snakes,calc}\n\n\n\n\\usepackage{listings, color}\n\n\\definecolor{dkgreen}{rgb}{0,0.6,0}\n\\definecolor{gray}{rgb}{0.5,0.5,0.5}\n\\definecolor{mauve}{rgb}{0.58,0,0.82}\n\n\n\n\\lstset{frame=tb,\n  language=Matlab,\n  aboveskip=3mm,\n  belowskip=3mm,\n  showstringspaces=false,\n  columns=flexible,\n  basicstyle={\\small\\ttfamily},\n  numbers=none,\n  numberstyle=\\tiny\\color{gray},\n  keywordstyle=\\color{blue},\n  commentstyle=\\color{dkgreen},\n  stringstyle=\\color{mauve},\n  breaklines=true,\n  breakatwhitespace=false,\n  tabsize=2,\n  numbers=left,\n  numbersep=5pt,\n  title=\\lstname\n}\n\n\n\n\\usepackage[section]{placeins}\n\n\\usepackage{amsmath,amssymb, cancel}\n%\n\\usepackage{url}\n\\urldef{\\mailsa}\\path|201301442@daiict.ac.in|\n\\urldef{\\mailsb}\\path|201301047@daiict.ac.in|\n\\newcommand{\\keywords}[1]{\\par\\addvspace\\baselineskip\n\\noindent\\keywordname\\enspace\\ignorespaces#1}\n\n\n\\renewcommand\\thesubsection{\\thesection(\\alph{subsection})}\n\n\n\\begin{document}\n\n\\mainmatter\n\n\\title{High Performance Computing Report}\n\n\\titlerunning{High Performance Computing Report}\n\n\\author{Author 1 ()\\\\Author 2 ()}%\n%\n\\authorrunning{Author 1 \\& Author 2}\n\\institute{Institute Name\\\\\n  \\mailsa\\\\\n  \\mailsb\\\\\n}\n\n\\maketitle\n\\section{Implementation Details}\n\\subsection{Brief and clear description about the Serial implementation}\n${this.iBCDSI}\n\\subsection{Brief and clear description about the implementation of the approach (Parallelization Strategy, Mapping of computation to threads)}\n${this.iBCSPI}\n\\section{Complexity and Analysis}\n\\subsection{Complexity of serial code}\n${this.iCoSeCo}\n\\subsection{Complexity of parallel code (split as needed into work, step, etc.) }\n${this.iCoPaCo}\n\\subsection{Cost of Parallel Algorithm}\n${this.iCoPa}\n\\subsection{Theoretical Speedup (using asymptotic analysis, etc.)}\n${this.iThSpu}\n\\subsection{Estimated Serial Fraction }\n${this.iEstSerFra}\n\\subsection{Tight upper bound based on Amdahl\'s Law}\n${this.iTub}\n\\subsection{Number of memory accesses}\n${this.iNuMA}\n\\subsection{Number of computations}\n${this.iNoCom}\n\n\\section{Curve Based Analysis}\n\\subsection{Time Curve related analysis (as no. of processor increases)}\n${this.iTCRAProc}\n\\subsection{Time Curve related analysis (as problem size increases, also for serial)}\n${this.iTCRAProSize}\n\\subsection{Speedup Curve related analysis (as problem size and no. of processors increase)}\n${this.iSCRA}\n\\subsection{Efficiency Curve related analysis}\n${this.iECRA}\n\\subsection{Karp-Flatt metric related analysis}\n${this.iKFRA}\n\n\\section{Further Detailed Analysis}\n\\subsection{Major serial and parallel overheads}\n${this.iMSPO}\n\\subsection{Memory wall related analysis}\n${this.iMWRA}\n\\subsection{Cache coherence related analysis}\n${this.iCCRA}\n\\subsection{False sharing related analysis}\n${this.iFSRA}\n\\subsection{Scheduling related analysis}\n${this.iSraRA}\n\\subsection{Load balance analysis}\n${this.iLBRA}\n\\subsection{Synchronisation related analysis}\n${this.iSyncRA}\n\\subsection{Granularity related analysis}\n${this.iGRA}\n\\subsection{Scalability related analysis}\n${this.iScaRA}\n\n\\section{Additional Approach Analysis}\n\\subsection{Analysis of any other concepts/factors you think were important in your problem-approach combination}\n${this.iAOC}\n\\subsection{Further details (Code balance , machine balance analysis, how much of peak performance achieved in terms of \\%)}\n${this.iCBMB}\n\\subsection{Advantages/Disadvantages of your approach}\n${this.iADDADA}\n\\subsection{Difficulties faced while implementing this approach}\n${this.iDFIA}\n\\subsection{Additional Comments}\n${this.iAAC}\n\n\\end{document}\n\n`;

        this.selection = [];
        this.file = {};
        this.chart_options = {
            titlePosition: 'in',
            height: 600,
            pointShape: 'circle',
            pointsVisible: true,
            explorer: {
                keepInBounds: true,
                maxZoomOut: 1
            },
            hAxis: {
                logScale: true
            },
            vAxis: {
                logScale: false
            },
            chartArea: {
                backgroundColor: {
                    stroke: '#000',
                    strokeWidth: 1
                }
            },
            crosshair: {
                color: 'black',
                trigger: 'both'
            },
            selectionMode: 'multiple'
        };

        this.execution_time_chart_options = {
            title: 'Problem size vs. Execution time',
            hAxis: {
                title: 'Problem size'
            },
            vAxis: {
                title: 'Execution time'
            }
        };

        this.speedup_chart_options = {
            title: 'Problem size vs. Speedup',
            hAxis: {
                title: 'Problem size'
            },
            vAxis: {
                title: 'Speedup'
            }
        };

        this.karpflatt_chart_options = {
            title: 'Problem size vs. Karp Flatt coefficient',
            hAxis: {
                title: 'Problem size'
            },
            vAxis: {
                title: 'Karp flatt coefficient'
            }
        };

        this.execution_time_data = new google.visualization.DataTable();
        this.speedup_data = new google.visualization.DataTable();
        this.karp_flatt_data = new google.visualization.DataTable();

        this.chart = new google.visualization.LineChart(document.getElementById('chart_div'));
        google.visualization.events.addListener(this.chart, 'ready', () => {
            this.chart_image = this.chart.getImageURI();
        });

        this.data_fetch_complete = false;
        this.active_chart = 'timeseries';

        this.refresh_chart(this.active_chart);
    }

    generate_report() {
        var download = document.createElement('a');
        this.tex_string = `\n\\documentclass[runningheads, a4paper, oribibl]{llncs}\n\n\\setcounter{tocdepth}{3}\n\\usepackage{graphicx}\n\\graphicspath{{../images/}}\n\\usepackage{epstopdf}\n\\usepackage{standalone}\n\\usepackage{xcolor}\n\\usepackage{tikz}\n\\usetikzlibrary{fit}\n\\usetikzlibrary{shapes,snakes,calc}\n\n\n\n\\usepackage{listings, color}\n\n\\definecolor{dkgreen}{rgb}{0,0.6,0}\n\\definecolor{gray}{rgb}{0.5,0.5,0.5}\n\\definecolor{mauve}{rgb}{0.58,0,0.82}\n\n\n\n\\lstset{frame=tb,\n  language=Matlab,\n  aboveskip=3mm,\n  belowskip=3mm,\n  showstringspaces=false,\n  columns=flexible,\n  basicstyle={\\small\\ttfamily},\n  numbers=none,\n  numberstyle=\\tiny\\color{gray},\n  keywordstyle=\\color{blue},\n  commentstyle=\\color{dkgreen},\n  stringstyle=\\color{mauve},\n  breaklines=true,\n  breakatwhitespace=false,\n  tabsize=2,\n  numbers=left,\n  numbersep=5pt,\n  title=\\lstname\n}\n\n\n\n\\usepackage[section]{placeins}\n\n\\usepackage{amsmath,amssymb, cancel}\n%\n\\usepackage{url}\n\\urldef{\\mailsa}\\path|201301442@daiict.ac.in|\n\\urldef{\\mailsb}\\path|201301047@daiict.ac.in|\n\\newcommand{\\keywords}[1]{\\par\\addvspace\\baselineskip\n\\noindent\\keywordname\\enspace\\ignorespaces#1}\n\n\n\\renewcommand\\thesubsection{\\thesection(\\alph{subsection})}\n\n\n\\begin{document}\n\n\\mainmatter\n\n\\title{High Performance Computing Report}\n\n\\titlerunning{High Performance Computing Report}\n\n\\author{Author 1 ()\\\\Author 2 ()}%\n%\n\\authorrunning{Author 1 \\& Author 2}\n\\institute{Institute Name\\\\\n  \\mailsa\\\\\n  \\mailsb\\\\\n}\n\n\\maketitle\n\\section{Implementation Details}\n\\subsection{Brief and clear description about the Serial implementation}\n${this.iBCDSI}\n\\subsection{Brief and clear description about the implementation of the approach (Parallelization Strategy, Mapping of computation to threads)}\n${this.iBCSPI}\n\\section{Complexity and Analysis}\n\\subsection{Complexity of serial code}\n${this.iCoSeCo}\n\\subsection{Complexity of parallel code (split as needed into work, step, etc.) }\n${this.iCoPaCo}\n\\subsection{Cost of Parallel Algorithm}\n${this.iCoPa}\n\\subsection{Theoretical Speedup (using asymptotic analysis, etc.)}\n${this.iThSpu}\n\\subsection{Estimated Serial Fraction }\n${this.iEstSerFra}\n\\subsection{Tight upper bound based on Amdahl\'s Law}\n${this.iTub}\n\\subsection{Number of memory accesses}\n${this.iNuMA}\n\\subsection{Number of computations}\n${this.iNoCom}\n\n\\section{Curve Based Analysis}\n\\subsection{Time Curve related analysis (as no. of processor increases)}\n${this.iTCRAProc}\n\\subsection{Time Curve related analysis (as problem size increases, also for serial)}\n${this.iTCRAProSize}\n\\subsection{Speedup Curve related analysis (as problem size and no. of processors increase)}\n${this.iSCRA}\n\\subsection{Efficiency Curve related analysis}\n${this.iECRA}\n\\subsection{Karp-Flatt metric related analysis}\n${this.iKFRA}\n\n\\section{Further Detailed Analysis}\n\\subsection{Major serial and parallel overheads}\n${this.iMSPO}\n\\subsection{Memory wall related analysis}\n${this.iMWRA}\n\\subsection{Cache coherence related analysis}\n${this.iCCRA}\n\\subsection{False sharing related analysis}\n${this.iFSRA}\n\\subsection{Scheduling related analysis}\n${this.iSraRA}\n\\subsection{Load balance analysis}\n${this.iLBRA}\n\\subsection{Synchronisation related analysis}\n${this.iSyncRA}\n\\subsection{Granularity related analysis}\n${this.iGRA}\n\\subsection{Scalability related analysis}\n${this.iScaRA}\n\n\\section{Additional Approach Analysis}\n\\subsection{Analysis of any other concepts/factors you think were important in your problem-approach combination}\n${this.iAOC}\n\\subsection{Further details (Code balance , machine balance analysis, how much of peak performance achieved in terms of \\%)}\n${this.iCBMB}\n\\subsection{Advantages/Disadvantages of your approach}\n${this.iADDADA}\n\\subsection{Difficulties faced while implementing this approach}\n${this.iDFIA}\n\\subsection{Additional Comments}\n${this.iAAC}\n\n\\end{document}\n\n`;
        download.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(this.tex_string);
        download.download = 'report.tex';
        download.click();

        download.href = this.chart_image;
        download.download = 'image.png';
        download.click();
    }

    clear_report() {
        this.iBCDSI = '';
        this.iBCSPI = '';
        this.iCoSeCo = '';
        this.iCoPaCo = '';
        this.iCoPa = '';
        this.iThSpu = '';
        this.iEstSerFra = '';
        this.iTub = '';
        this.iNuMA = '';
        this.iNoCom = '';
        this.iTCRAProc = '';
        this.iTCRAProSize = '';
        this.iSCRA = '';
        this.iECRA = '';
        this.iKFRA = '';
        this.iMSPO = '';
        this.iMWRA = '';
        this.iCCRA = '';
        this.iFSRA = '';
        this.iSraRA = '';
        this.iLBRA = '';
        this.iSyncRA = '';
        this.iGRA = '';
        this.iScaRA = '';
        this.iAOC = '';
        this.iCBMB = '';
        this.iADDADA = '';
        this.iDFIA = '';
        this.iAAC = '';
        this.tex_string = `\n\\documentclass[runningheads, a4paper, oribibl]{llncs}\n\n\\setcounter{tocdepth}{3}\n\\usepackage{graphicx}\n\\graphicspath{{../images/}}\n\\usepackage{epstopdf}\n\\usepackage{standalone}\n\\usepackage{xcolor}\n\\usepackage{tikz}\n\\usetikzlibrary{fit}\n\\usetikzlibrary{shapes,snakes,calc}\n\n\n\n\\usepackage{listings, color}\n\n\\definecolor{dkgreen}{rgb}{0,0.6,0}\n\\definecolor{gray}{rgb}{0.5,0.5,0.5}\n\\definecolor{mauve}{rgb}{0.58,0,0.82}\n\n\n\n\\lstset{frame=tb,\n  language=Matlab,\n  aboveskip=3mm,\n  belowskip=3mm,\n  showstringspaces=false,\n  columns=flexible,\n  basicstyle={\\small\\ttfamily},\n  numbers=none,\n  numberstyle=\\tiny\\color{gray},\n  keywordstyle=\\color{blue},\n  commentstyle=\\color{dkgreen},\n  stringstyle=\\color{mauve},\n  breaklines=true,\n  breakatwhitespace=false,\n  tabsize=2,\n  numbers=left,\n  numbersep=5pt,\n  title=\\lstname\n}\n\n\n\n\\usepackage[section]{placeins}\n\n\\usepackage{amsmath,amssymb, cancel}\n%\n\\usepackage{url}\n\\urldef{\\mailsa}\\path|201301442@daiict.ac.in|\n\\urldef{\\mailsb}\\path|201301047@daiict.ac.in|\n\\newcommand{\\keywords}[1]{\\par\\addvspace\\baselineskip\n\\noindent\\keywordname\\enspace\\ignorespaces#1}\n\n\n\\renewcommand\\thesubsection{\\thesection(\\alph{subsection})}\n\n\n\\begin{document}\n\n\\mainmatter\n\n\\title{High Performance Computing Report}\n\n\\titlerunning{High Performance Computing Report}\n\n\\author{Author 1 ()\\\\Author 2 ()}%\n%\n\\authorrunning{Author 1 \\& Author 2}\n\\institute{Institute Name\\\\\n  \\mailsa\\\\\n  \\mailsb\\\\\n}\n\n\\maketitle\n\\section{Implementation Details}\n\\subsection{Brief and clear description about the Serial implementation}\n${this.iBCDSI}\n\\subsection{Brief and clear description about the implementation of the approach (Parallelization Strategy, Mapping of computation to threads)}\n${this.iBCSPI}\n\\section{Complexity and Analysis}\n\\subsection{Complexity of serial code}\n${this.iCoSeCo}\n\\subsection{Complexity of parallel code (split as needed into work, step, etc.) }\n${this.iCoPaCo}\n\\subsection{Cost of Parallel Algorithm}\n${this.iCoPa}\n\\subsection{Theoretical Speedup (using asymptotic analysis, etc.)}\n${this.iThSpu}\n\\subsection{Estimated Serial Fraction }\n${this.iEstSerFra}\n\\subsection{Tight upper bound based on Amdahl\'s Law}\n${this.iTub}\n\\subsection{Number of memory accesses}\n${this.iNuMA}\n\\subsection{Number of computations}\n${this.iNoCom}\n\n\\section{Curve Based Analysis}\n\\subsection{Time Curve related analysis (as no. of processor increases)}\n${this.iTCRAProc}\n\\subsection{Time Curve related analysis (as problem size increases, also for serial)}\n${this.iTCRAProSize}\n\\subsection{Speedup Curve related analysis (as problem size and no. of processors increase)}\n${this.iSCRA}\n\\subsection{Efficiency Curve related analysis}\n${this.iECRA}\n\\subsection{Karp-Flatt metric related analysis}\n${this.iKFRA}\n\n\\section{Further Detailed Analysis}\n\\subsection{Major serial and parallel overheads}\n${this.iMSPO}\n\\subsection{Memory wall related analysis}\n${this.iMWRA}\n\\subsection{Cache coherence related analysis}\n${this.iCCRA}\n\\subsection{False sharing related analysis}\n${this.iFSRA}\n\\subsection{Scheduling related analysis}\n${this.iSraRA}\n\\subsection{Load balance analysis}\n${this.iLBRA}\n\\subsection{Synchronisation related analysis}\n${this.iSyncRA}\n\\subsection{Granularity related analysis}\n${this.iGRA}\n\\subsection{Scalability related analysis}\n${this.iScaRA}\n\n\\section{Additional Approach Analysis}\n\\subsection{Analysis of any other concepts/factors you think were important in your problem-approach combination}\n${this.iAOC}\n\\subsection{Further details (Code balance , machine balance analysis, how much of peak performance achieved in terms of \\%)}\n${this.iCBMB}\n\\subsection{Advantages/Disadvantages of your approach}\n${this.iADDADA}\n\\subsection{Difficulties faced while implementing this approach}\n${this.iDFIA}\n\\subsection{Additional Comments}\n${this.iAAC}\n\n\\end{document}\n\n`;
    }

    // File related function =============================================

    read_file(files) {
        var file = files[0];
        var read = new FileReader();
        read.onload = () => {
            var file_text = read.result;
            var file_object = this.file_to_object(file_text);
            this.set_warning_flags(file_object);
            this.plot_file(file_object);
        }
        read.readAsText(file);
    }

    file_to_object(file_text) {
        var lines = _.remove(_.split(file_text, '\n'), function(x) {
                return x != ""
            }),
            object = [];
        for (var i in lines) {
            var line = _.map(_.split(lines[i], ','), (x) => {
                return parseFloat(x)
            });
            var number = {
                "n": line[0],
                "p": line[1],
                "run_id": line[2],
                "algS": line[3],
                "algNS": 0,
                "e2eS": line[4],
                "e2eNS": 0
            };
            object.push(number);
        }
        return object;
    }

    plot_file(file_object) {
        var unique_p = _.map(_.uniq(_.map(file_object, 'p')), function(t) {
            return t.toString()
        });

        for (var i in unique_p) {
            this.add_number_in_table(file_object, unique_p[i], 'e2e');
            this.add_number_in_table(file_object, unique_p[i], 'alg');
        }

        this.refresh_chart(this.active_chart);

    }

    set_warning_flags(file_object) {
        var unique_p = _.map(_.uniq(_.map(file_object, 'p')), function(t) {
            return t.toString()
        });
        var unique_n = _.map(_.uniq(_.map(file_object, 'n')), function(t) {
            return t.toString()
        });
        var unique_runs = _.map(_.uniq(_.map(file_object, 'run_id')), function(t) {
            return t.toString()
        });

        if(unique_runs.length < this.run_threshold) {
            this.low_runs = true;
        }
        if(unique_n.length < this.n_threshold) {
            this.low_n = true;
        }
        if(unique_p.length < this.p_threshold) {
            this.low_p = true;
        }
        if(_.indexOf(unique_p, "0")==-1) {
            this.no_serial = true;
        }
    }

    // Computation functions =============================================

    averaged_execution_time(number) {
        var e2e_execution_time_by_problem_size = {};
        var alg_execution_time_by_problem_size = {};

        var number_grouped_by_problem_size = _.groupBy(number, function(x) {
            return x.n
        });
        for (var size in number_grouped_by_problem_size) {
            var e2e_averaged_execution_time = 0;
            var alg_averaged_execution_time = 0;
            var count = 0;
            for (var i in number_grouped_by_problem_size[size]) {
                count++;
                var e2eS = parseFloat(number_grouped_by_problem_size[size][i].e2eS);
                var algS = parseFloat(number_grouped_by_problem_size[size][i].algS);
                var e2eNS = parseFloat(number_grouped_by_problem_size[size][i].e2eNS);
                var algNS = parseFloat(number_grouped_by_problem_size[size][i].algNS);

                e2e_averaged_execution_time += (e2eS + (e2eNS * 1e-9))
                alg_averaged_execution_time += (algS + (algNS * 1e-9))
            }
            e2e_averaged_execution_time /= count;
            alg_averaged_execution_time /= count;

            e2e_execution_time_by_problem_size[size] = e2e_averaged_execution_time;
            alg_execution_time_by_problem_size[size] = alg_averaged_execution_time;
        }

        return {
            e2e: e2e_execution_time_by_problem_size,
            alg: alg_execution_time_by_problem_size
        };
    }

    averaged_speedup(number, number_for_serial) {
        var e2e_speedup_by_problem_size = {};
        var alg_speedup_by_problem_size = {};

        var average_execution_time = this.averaged_execution_time(number);
        var e2e_execution_time = average_execution_time.e2e;
        var alg_execution_time = average_execution_time.alg;

        var average_execution_time0 = this.averaged_execution_time(number_for_serial);
        var e2e_execution_time0 = average_execution_time0.e2e;
        var alg_execution_time0 = average_execution_time0.alg;

        for (var size in e2e_execution_time) {
            e2e_speedup_by_problem_size[size] = e2e_execution_time0[size] / e2e_execution_time[size];
        }

        for (var size in alg_execution_time) {
            alg_speedup_by_problem_size[size] = alg_execution_time0[size] / alg_execution_time[size];
        }

        return {
            e2e: e2e_speedup_by_problem_size,
            alg: alg_speedup_by_problem_size
        };
    }

    // Table related functions =============================================

    add_number_in_table(numbers, nthreads, e2e_or_alg) {
        var number = _.filter(numbers, function(number) {
            return (number.p == nthreads);
        });
        var serialnumbers = _.filter(numbers, function(number) {
            return (number.p == 0);
        })
        var execution_time = this.averaged_execution_time(number);
        var speedup = this.averaged_speedup(number, serialnumbers);


        if (e2e_or_alg == 'e2e') {
            var e2e_execution_time_table = this.object_to_table(execution_time.e2e, 'SIZE', 'size', this.getLabel(nthreads, 'e2e'), this.getID(nthreads, 'e2e'));
            var e2e_speedup_table = this.object_to_table(speedup.e2e, 'SIZE', 'size', this.getLabel(nthreads, 'e2e'), this.getID(nthreads, 'e2e'));

            var columns_from_table1 = [];
            for (var x = 0; x < this.execution_time_data.getNumberOfColumns() - 1; x++) {
                columns_from_table1.push(x + 1);
            }

            if (this.execution_time_data.getNumberOfColumns() < 2)
                this.execution_time_data = e2e_execution_time_table;
            else
                this.execution_time_data = google.visualization.data.join(this.execution_time_data, e2e_execution_time_table, 'full', [
                    [0, 0]
                ], columns_from_table1, [1]);

            if (this.speedup_data.getNumberOfColumns() < 2)
                this.speedup_data = e2e_speedup_table;
            else
                this.speedup_data = google.visualization.data.join(this.speedup_data, e2e_speedup_table, 'full', [
                    [0, 0]
                ], columns_from_table1, [1]);
        } else if (e2e_or_alg == 'alg') {
            var alg_execution_time_table = this.object_to_table(execution_time.alg, 'SIZE', 'size', this.getLabel(nthreads, 'alg'), this.getID(nthreads, 'alg'));
            var alg_speedup_table = this.object_to_table(speedup.alg, 'SIZE', 'size', this.getLabel(nthreads, 'alg'), this.getID(nthreads, 'alg'));

            var columns_from_table1 = [];
            for (var x = 0; x < this.execution_time_data.getNumberOfColumns() - 1; x++) {
                columns_from_table1.push(x + 1);
            }

            if (this.execution_time_data.getNumberOfColumns() < 2)
                this.execution_time_data = alg_execution_time_table;
            else
                this.execution_time_data = google.visualization.data.join(this.execution_time_data, alg_execution_time_table, 'full', [
                    [0, 0]
                ], columns_from_table1, [1]);

            if (this.speedup_data.getNumberOfColumns() < 2)
                this.speedup_data = alg_speedup_table;
            else
                this.speedup_data = google.visualization.data.join(this.speedup_data, alg_speedup_table, 'full', [
                    [0, 0]
                ], columns_from_table1, [1]);
        }
    }

    remove_number_from_table(nthreads, e2e_or_alg) {
        var numCol = this.execution_time_data.getNumberOfColumns();
        for (var j = 1; j < numCol; j++) {
            if (this.execution_time_data.getColumnId(j) == this.getID(nthreads, e2e_or_alg)) {
                this.execution_time_data.removeColumn(j);
                this.speedup_data.removeColumn(j);
                numCol--;
                break;
            }
        }
    }

    object_to_table(object, keylabel, keyid, vallabel, valid) {
        var table = new google.visualization.DataTable();
        var rows = [];
        for (var key in object) {
            rows.push([parseFloat(key), parseFloat(object[key])]);
        }
        table.addColumn('number', keylabel, keyid);
        table.addColumn('number', vallabel, valid);
        table.addRows(rows);
        return table;
    }

    // Label & ID related functions =============================================
    getLabel(nthreads, e2e_or_alg) {
        var part1 = '',
            part3 = '';
        if (e2e_or_alg == 'e2e')
            part1 = 'E2E ';
        else
            part1 = 'ALG ';
        part3 = 'P ' + nthreads + ' ';

        return part1 + part3;
    }

    getID(nthreads, machine_id, e2e_or_alg, table_type) {
        var part1 = '',
            part3 = '';

        if (e2e_or_alg == 'e2e')
            part1 = 'e2e_';
        else
            part1 = 'alg_';
        part3 = nthreads + '_';

        return part1 + part3;
    }

    // Chart related functions =============================================

    chart_option_selection() {

        if (this.active_chart == 'timeseries') {
            _.merge(this.chart_options, this.execution_time_chart_options);
        }

        if (this.active_chart == 'speedup') {
            _.merge(this.chart_options, this.speedup_chart_options);
        }

        // if(this.active_chart=='karpflatt') {
        //     _.merge(this.chart_options, this.karpflatt_chart_options);
        // }
    }

    refresh_chart(type) {
        if (type != this.active_chart) {
            this.active_chart = type;
        }
        var data;
        switch (this.active_chart) {
            case 'timeseries':
                data = this.execution_time_data;
                break;
            case 'speedup':
                data = this.speedup_data;
                break;
            case 'karpflatt':
                data = this.karp_flatt_data;
                break;
            default:
                data = new google.visualization.DataTable();
        }
        if (data.getNumberOfColumns() > 1) {
            this.chart_option_selection();
            this.chart.draw(data, this.chart_options);
        } else {
            var dummy_data = new google.visualization.DataTable();
            dummy_data.addColumn('number', 'd1');
            dummy_data.addColumn('number', 'd2');
            dummy_data.addRow([0, 0]);
            this.chart.draw(dummy_data, this.chart_options);
        }
    }

    export_chart() {
        var download = document.createElement('a');
        download.href = this.chart_image;
        download.download = 'image.png';
        download.click();
    }
}
