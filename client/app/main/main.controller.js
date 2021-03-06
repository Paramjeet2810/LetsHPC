import _ from 'lodash';
import ChartOption from '../../classes/chartOption';
import Factory from '../../classes/factory';

export default class MainController {

    count = 0;

    categories = [];
    selectedCategory = '';

    problems = [];
    selectedProblem = '';

    architecture = 'shared';

    // Ready variables
    problemsReady = false;
    categoriesReady = false;
    peamDataReady = true;

    perfFields = ["cycles","instructions","cacheReferences","cacheMisses","busCycles","L1DcacheLoads","L1DcacheLoadMisses","L1DcacheStores","dTLBLoads","dTLBLoadMisses","LLCLoads","LLCLoadMisses","LLCStores","branches","branchMisses","contextSwitches","cpuMigrations","pageFaults"]

    ca = {
        selectedApproaches: [],
        selectedMachine: {},
        selectedPenv: {},

        machines: [],
        approaches: [],
        penvs: [],

        dataTable: Factory.create('table'),
        data: {},

        chart: {},
        chartImage: {},
        chartOptions: Factory.create('chartOption'),
        activeChart: 'executionTime',
        activeStatistic: 'mean',

        updateMachines: () => {
            var selectedApproachIDs = _.map(this.ca.selectedApproaches, '_id');
            this.ca.machines = _.filter(_.map(_.uniq(_.map(_.filter(this.numbers, (number) => {
                return selectedApproachIDs.indexOf(number.approach_id) != -1;
            }), 'machine_id')), (machine_id) => {
                return _.find(this.machines, _.matchesProperty('_id', machine_id));
            }), machine => {
                return machine != undefined;
            });
        },

        updatePenvs: () => {
            var selectedApproachIDs = _.map(this.ca.selectedApproaches, '_id');
            this.ca.penvs = _.filter(_.map(_.uniq(_.map(_.filter(this.numbers, (number) => {
                return selectedApproachIDs.indexOf(number.approach_id) != -1;
            }), 'penv_id')), (penv_id) => {
                return _.find(this.penvs, _.matchesProperty('_id', penv_id));
            }), penv => {
                return penv != undefined;
            });
        },

        setData: () => {
            this.ca.dataSet = false;
            this.ca.approachSelections = {};
            this.ca.dataTable.clear();

            var selectedApproachIDs = _.map(this.ca.selectedApproaches, '_id');
            this.ca.selectedNumbers = _.filter(this.numbers, number => {
                return selectedApproachIDs.indexOf(number.approach_id) != -1 && this.ca.selectedMachine._id == number.machine_id;
            });

            _.forEach(this.ca.selectedApproaches, (selectedApproach) => {

                this.ca.approachSelections[selectedApproach._id] = {
                    uniqueThreadCounts: [],
                    plotE2E: false,
                    plotAlg: true,
                    selectedThreads: [],
                    lastSelectedThreads: []
                }

                this.ca.approachSelections[selectedApproach._id].uniqueThreadCounts = _.map(_.uniq(_.map(_.filter(this.ca.selectedNumbers, selectedNumber => {
                    return selectedNumber.approach_id == selectedApproach._id;
                }), 'p')), _.toString);
            });

            this.ca.data = this.ca.dataTable.get(this.ca.activeChart);
            this.ca.dataSet = true;
        },

        updateChart: (approach) => {
            let approachID = approach._id;
            let approachSelection = this.ca.approachSelections[approachID];

            _.forEach(approachSelection.lastSelectedThreads, nthreads => {
                this.ca.dataTable.removeNumber(approach, nthreads, this.ca.selectedMachine, 'e2e');
                this.ca.dataTable.removeNumber(approach, nthreads, this.ca.selectedMachine, 'alg');
            })

            _.forEach(approachSelection.selectedThreads, nthreads => {
                if (approachSelection.plotE2E)
                    this.ca.dataTable.addNumber(approach, nthreads, this.ca.selectedMachine, 'e2e', this.numbers);
                if (approachSelection.plotAlg)
                    this.ca.dataTable.addNumber(approach, nthreads, this.ca.selectedMachine, 'alg', this.numbers);
            })

            approachSelection.lastSelectedThreads = _.cloneDeep(approachSelection.selectedThreads);

            // Clonedeep workaround for onChanges not being fired in chart component
            this.ca.data = _.cloneDeep(this.ca.dataTable.get(this.ca.activeChart, this.ca.activeStatistic));
        },

        changeChartType: (activeChart, activeStatistic) => {
            this.ca.activeChart = activeChart;
            this.ca.activeStatistic = activeStatistic;
            this.ca.data = this.ca.dataTable.get(activeChart, activeStatistic);
            this.ca.chartOptions.setOptions(activeChart);
            if(activeChart == "executionTime")
                this.ca.chartOptions.setOption('vAxis.title', this.camelCaseToTitle(activeStatistic) + ' of ' + this.camelCaseToTitle(activeChart) + ' (s)');
            else
                this.ca.chartOptions.setOption('vAxis.title', this.camelCaseToTitle(activeStatistic) + ' of ' + this.camelCaseToTitle(activeChart));
        }
    }

    cm = {
        selectedApproach: {},
        selectedMachines: [],
        selectedPenv: {},

        machines: [],
        approaches: [],
        penvs: [],

        dataTable: Factory.create('table'),
        data: {},

        chart: {},
        chartImage: {},
        chartOptions: Factory.create('chartOption'),
        activeChart: 'executionTime',
        activeStatistic: 'mean',

        updateApproaches: () => {
            var selectedMachineIDs = _.map(this.cm.selectedMachines, '_id');
            this.cm.approaches = _.filter(_.map(_.uniq(_.map(_.filter(this.numbers, (number) => {
                return selectedMachineIDs.indexOf(number.machine_id) != -1;
            }), 'approach_id')), (approachID) => {
                return _.find(this.approaches, _.matchesProperty('_id', approachID));
            }), approach => {
                return approach != undefined;
            });
        },

        updatePenvs: () => {
            var selectedMachineIDs = _.map(this.ca.selectedMachines, '_id');
            this.ca.penvs = _.filter(_.map(_.uniq(_.map(_.filter(this.numbers, (number) => {
                return selectedMachineIDs.indexOf(number.machine_id) != -1;
            }), 'penv_id')), (penvID) => {
                return _.find(this.penvs, _.matchesProperty('_id', penvID));
            }), penv => {
                return penv != undefined;
            });
        },

        setData: () => {
            this.cm.dataSet = false;
            this.cm.machineSelections = {};
            this.cm.dataTable.clear();

            var selectedMachineIDs = _.map(this.cm.selectedMachines, '_id')
            this.cm.selectedNumbers = _.filter(this.numbers, number => {
                return selectedMachineIDs.indexOf(number.machine_id) != -1 && this.cm.selectedApproach._id == number.approach_id;
            });

            _.forEach(this.cm.selectedMachines, (selectedMachine) => {

                this.cm.machineSelections[selectedMachine._id] = {
                    uniqueThreadCounts: [],
                    plotE2E: false,
                    plotAlg: true,
                    selectedThreads: [],
                    lastSelectedThreads: []
                }

                this.cm.machineSelections[selectedMachine._id].uniqueThreadCounts = _.map(_.uniq(_.map(_.filter(this.cm.selectedNumbers, selectedNumber => {
                    return selectedNumber.machine_id == selectedMachine._id;
                }), 'p')), _.toString);
            });

            this.cm.data = this.cm.dataTable.get(this.cm.activeChart);

            this.cm.dataSet = true;
        },

        updateChart: (machine) => {
            let machineID = machine._id;
            let machineSelection = this.cm.machineSelections[machineID];

            _.forEach(machineSelection.lastSelectedThreads, nthreads => {
                this.cm.dataTable.removeNumber(this.cm.selectedApproach, nthreads, machine, 'e2e');
                this.cm.dataTable.removeNumber(this.cm.selectedApproach, nthreads, machine, 'alg');
            })

            _.forEach(machineSelection.selectedThreads, nthreads => {
                if (machineSelection.plotE2E)
                    this.cm.dataTable.addNumber(this.cm.selectedApproach, nthreads, machine, 'e2e', this.numbers);
                if (machineSelection.plotAlg)
                    this.cm.dataTable.addNumber(this.cm.selectedApproach, nthreads, machine, 'alg', this.numbers);
            })

            machineSelection.lastSelectedThreads = _.cloneDeep(machineSelection.selectedThreads);

            this.cm.data = _.cloneDeep(this.cm.dataTable.get(this.cm.activeChart, this.cm.activeStatistic));
        },

        changeChartType: (activeChart, activeStatistic) => {
            this.cm.activeChart = activeChart;
            this.cm.activeStatistic = activeStatistic;
            this.cm.data = this.cm.dataTable.get(activeChart, activeStatistic);
            this.cm.chartOptions.setOptions(activeChart);
            if(activeChart == "executionTime")
                this.cm.chartOptions.setOption('vAxis.title', this.camelCaseToTitle(activeStatistic) + ' of ' + this.camelCaseToTitle(activeChart) + ' (s)');
            else
                this.cm.chartOptions.setOption('vAxis.title', this.camelCaseToTitle(activeStatistic) + ' of ' + this.camelCaseToTitle(activeChart));
        }
    }

    /*@ngInject*/
    constructor($scope, $q, CategoryService, ProblemService, NumberService, PerfService, ApproachService, MachineService, CalculatorService, TableService) {

        $(document).ready(() => {
            window.document.title = 'Comparison Tool - LETs HPC';
        })

        this.$q = $q;
        this.CategoryService = CategoryService;
        this.ProblemService = ProblemService;
        this.ApproachService = ApproachService;
        this.MachineService = MachineService;
        this.NumberService = NumberService;
        this.PerfService = PerfService;
        this.CalculatorService = CalculatorService;
        this.TableService = TableService;

        // Fetch categories
        this.categoriesReady = false;
        this.CategoryService
            .getAllCategories()
            .then(response => {
                this.categories = response;
                this.categoriesReady = true;
            });

        this.ca.dataTable.addServices(CalculatorService, TableService);
        this.cm.dataTable.addServices(CalculatorService, TableService);

        $scope.$watch(() => {
            return {
                m: this.cm.selectedMachines,
                a: this.cm.selectedApproach
            }
        }, newVal => {
            if (this.cm.dataSet)
                this.cm.setData();
        }, true);

        $scope.$watch(() => {
            return {
                m: this.ca.selectedMachine,
                a: this.ca.selectedApproaches
            }
        }, newVal => {
            if (this.ca.dataSet)
                this.ca.setData();
        }, true);

        this.activateTooltip();
    }

    selectCategory(selectedCategory) {
        // If category has changed,
        if (this.selectedCategory != selectedCategory) {
            this.selectedCategory = selectedCategory;
            this.problemsReady = false;
            this.ProblemService
                .getProblemsByCategory(this.selectedCategory._id)
                .then(response => {
                    this.problems = response;
                    this.problemsReady = true;
                })
        }
    }

    selectProblem(selectedProblem) {
        // If problem has changed
        if (this.selectedProblem != selectedProblem) {
            this.selectedProblem = selectedProblem;
        }
    }

    getProblemData() {
        this.peamDataReady = false;
        var numberFetch = this.NumberService
            .getNumbersByProblemAndArchitecture(this.selectedProblem._id, this.architecture)
            .then(response => {
                this.numbers = response;
            });
        var perfFetch = this.PerfService
            .getPerfsByProblemAndArchitecture(this.selectedProblem._id, this.architecture)
            .then(response => {
                this.perfs = response;
            });
        var approachFetch = this.ApproachService
            .getApproachesByProblemAndArchitecture(this.selectedProblem._id, this.architecture)
            .then(response => {
                this.approaches = response;
            });
        var machineFetch = this.MachineService
            .getMachinesByProblemAndArchitecture(this.selectedProblem._id, this.architecture)
            .then(response => {
                this.machines = response;
            });
        this.$q.all([numberFetch, perfFetch, approachFetch, machineFetch])
            .then(() => {
                this.numbers = _.concat(this.numbers, this.perfs);
                this.peamDataReady = true;
                google.visualization.events.addListener(this.ca.chart, 'ready', () => {
                    this.ca.chartImage = chart.getImageURI();
                });
                google.visualization.events.addListener(this.cm.chart, 'ready', () => {
                    this.cm.chartImage = chart.getImageURI();
                });
            });
    }

    activateTooltip() {
        $(function() {
            $('[data-toggle="tooltip"]').tooltip()
        });
    }

    reload(forceGet) {
        location.reload(forceGet);
    }

    camelCaseToTitle(str) {
        return str
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, function(str){ return str.toUpperCase(); });
    }
}
