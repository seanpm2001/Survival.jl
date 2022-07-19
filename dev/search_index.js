var documenterSearchIndex = {"docs":
[{"location":"events/#Event-Times","page":"Event Times","title":"Event Times","text":"","category":"section"},{"location":"events/","page":"Event Times","title":"Event Times","text":"A crucial concept in survival analysis is the time elapsed between some landmark and a particular event of interest. As an example, say you're running a clinical trial to investigate the efficacy of a new anticonvulsant. You may be interested in the time from the start of therapy to the first epileptic seizure for each patient. But if a patient dies or otherwise goes off study before they have a seizure, you'll assume that a seizure would have occurred eventually, but you don't know when exactly. In this case the event time is right censored; the true event time is unknown, all you know is that it exceeds the observed time.","category":"page"},{"location":"events/","page":"Event Times","title":"Event Times","text":"A dedicated type is provided to conveniently store right censored data.","category":"page"},{"location":"events/","page":"Event Times","title":"Event Times","text":"Survival.EventTime","category":"page"},{"location":"events/#Survival.EventTime","page":"Event Times","title":"Survival.EventTime","text":"EventTime{T}\n\nImmutable object containing the real-valued time to an event as well as an indicator of whether the time corresponds to an observed event (true) or right censoring (false).\n\n\n\n\n\n","category":"type"},{"location":"cox/#Cox-Proportional-Hazards-Model","page":"Cox","title":"Cox Proportional Hazards Model","text":"","category":"section"},{"location":"cox/","page":"Cox","title":"Cox","text":"The Cox proportional hazards model is a semiparametric regression model used to fit survival models without knowing the distribution. It is based on the assumption that covariates affect the hazard function multiplicatively. That is,","category":"page"},{"location":"cox/","page":"Cox","title":"Cox","text":"lambda(t  X_i) = lambda_0(t) exp(X_i cdot beta)","category":"page"},{"location":"cox/","page":"Cox","title":"Cox","text":"where lambda(tX_i) is the estimated hazard for sample i, lambda_0 is the baseline hazard, X_i is the vector of covariates for sample i, and beta is the vector of coefficients in the model.","category":"page"},{"location":"cox/#API","page":"Cox","title":"API","text":"","category":"section"},{"location":"cox/","page":"Cox","title":"Cox","text":"StatsBase.fit(::Type{CoxModel}, M::AbstractMatrix, y::AbstractVector; kwargs...)","category":"page"},{"location":"cox/#StatsAPI.fit-Tuple{Type{CoxModel}, AbstractMatrix, AbstractVector}","page":"Cox","title":"StatsAPI.fit","text":"fit(::Type{CoxModel}, M::AbstractMatrix, y::AbstractVector; kwargs...)\n\nGiven a matrix M of predictors and a corresponding vector of events, compute the Cox proportional hazard model estimate of coefficients. Returns a CoxModel object.\n\n\n\n\n\n","category":"method"},{"location":"cox/#References","page":"Cox","title":"References","text":"","category":"section"},{"location":"cox/","page":"Cox","title":"Cox","text":"Cox, D. R. (1972). Regression models and life tables (with discussion). Journal of the Royal Statistical Society, Series B, 34:187–220.","category":"page"},{"location":"getting_started/#Getting-Started","page":"Getting Started","title":"Getting Started","text":"","category":"section"},{"location":"getting_started/#Cox-proportional-hazards-regression-model","page":"Getting Started","title":"Cox proportional hazards regression model","text":"","category":"section"},{"location":"getting_started/","page":"Getting Started","title":"Getting Started","text":"This tutorial shows how to fit a Cox model and set up the EventTime values for right censored events.","category":"page"},{"location":"getting_started/#Dataset","page":"Getting Started","title":"Dataset","text":"","category":"section"},{"location":"getting_started/","page":"Getting Started","title":"Getting Started","text":"In this example we'll use a table containing criminal recidivism data from Rossi et al. (1980). The data pertain to 432 convicts who were released from Maryland state prisons in the 1970s and who were followed for one year after release. The released convicts were randomly assigned to receive or not receive financial aid with equal probability. The outcome of interest is the time from release to rearrest.","category":"page"},{"location":"getting_started/","page":"Getting Started","title":"Getting Started","text":"The dataset is available as a CSV file in this package's test/data/ directory. To load the data as a DataFrame, we'll use the CSV and DataFrames packages.","category":"page"},{"location":"getting_started/","page":"Getting Started","title":"Getting Started","text":"julia> using Survival, StatsModels, CSV, DataFrames\n\njulia> rossi = CSV.read(joinpath(pkgdir(Survival), \"test\", \"data\", \"rossi.csv\")), DataFrame);","category":"page"},{"location":"getting_started/#Fitting-the-model","page":"Getting Started","title":"Fitting the model","text":"","category":"section"},{"location":"getting_started/","page":"Getting Started","title":"Getting Started","text":"We now construct the event times used as the model response. The EventTime constructor accepts a time value and an indicator of whether the value was observed (true) or right-censored (false). The times in this data frame are in the column week and the arrest status in arrest. An arrest value of 1 indicates an observed event (arrest) and 0 indicates censoring.","category":"page"},{"location":"getting_started/","page":"Getting Started","title":"Getting Started","text":"julia> rossi.event = EventTime.(rossi.week, rossi.arrest .== 1);\n\njulia> first(rossi, 10)\n5×10 DataFrame\n Row │ arrest  week   fin    age    race   wexp   mar    paro   prio   event\n     │ Int64   Int64  Int64  Int64  Int64  Int64  Int64  Int64  Int64  EventTim…\n─────┼───────────────────────────────────────────────────────────────────────────\n   1 │      1     20      0     27      1      0      0      1      3  20\n   2 │      1     17      0     18      1      0      0      1      8  17\n   3 │      1     25      0     19      0      1      0      1     13  25\n   4 │      0     52      1     23      1      1      1      1      1  52+\n   5 │      0     52      0     19      0      1      0      1      3  52+","category":"page"},{"location":"getting_started/","page":"Getting Started","title":"Getting Started","text":"To fit the Cox model, we can use fit(CoxModel, ...) or the shorthand coxph(...).","category":"page"},{"location":"getting_started/","page":"Getting Started","title":"Getting Started","text":"julia> model = coxph(@formula(event ~ fin + age + race + wexp + mar + paro + prio), rossi)\nStatsModels.TableRegressionModel{CoxModel{Float64}, Matrix{Float64}}\n\nevent ~ fin + age + race + wexp + mar + paro + prio\n\nCoefficients:\n────────────────────────────────────────────────\n        Estimate  Std.Error    z value  Pr(>|z|)\n────────────────────────────────────────────────\nfin   -0.379416   0.191379   -1.98253     0.0474\nage   -0.0574299  0.0219988  -2.61059     0.0090\nrace   0.31392    0.307995    1.01924     0.3081\nwexp  -0.14981    0.212226   -0.705898    0.4803\nmar   -0.433724   0.38187    -1.13579     0.2560\nparo  -0.0848615  0.195756   -0.433505    0.6646\nprio   0.091521   0.0286469   3.1948      0.0014\n────────────────────────────────────────────────","category":"page"},{"location":"getting_started/#Accessing-values","page":"Getting Started","title":"Accessing values","text":"","category":"section"},{"location":"getting_started/","page":"Getting Started","title":"Getting Started","text":"Many of the common functions for accessing model parameters used in packages such as GLM are extended for use with CoxModels.","category":"page"},{"location":"getting_started/","page":"Getting Started","title":"Getting Started","text":"For example, the model coefficient estimates can be extracted with coef:","category":"page"},{"location":"getting_started/","page":"Getting Started","title":"Getting Started","text":"julia> coef(model)\n7-element Vector{Float64}:\n -0.3794158823466362\n -0.057429889713653676\n  0.313920393830735\n -0.14980964863737226\n -0.43372380447995285\n -0.08486148372086805\n  0.09152099594619753","category":"page"},{"location":"getting_started/","page":"Getting Started","title":"Getting Started","text":"Similarly, the standard errors of the estimates are accessible with stderror(model) and the full variance-covariance matrix with vcov(model).","category":"page"},{"location":"getting_started/","page":"Getting Started","title":"Getting Started","text":"Other available functions include:","category":"page"},{"location":"getting_started/","page":"Getting Started","title":"Getting Started","text":"loglikelihood, the log likelihood of the fitted model\nnullloglikelihood, the log likelihood of the null model\ndof, degrees of freedom\nnobs, the number of observations used to fit the model\ncoeftable, a table of coefficient names, estimates, standard errors, z-values, and p-values","category":"page"},{"location":"km/#Kaplan-Meier-Estimator","page":"Kaplan-Meier","title":"Kaplan-Meier Estimator","text":"","category":"section"},{"location":"km/","page":"Kaplan-Meier","title":"Kaplan-Meier","text":"The Kaplan-Meier estimator is a nonparametric estimator of the survivor function, i.e. the probability of survival beyond a given time.","category":"page"},{"location":"km/","page":"Kaplan-Meier","title":"Kaplan-Meier","text":"The estimate is given by","category":"page"},{"location":"km/","page":"Kaplan-Meier","title":"Kaplan-Meier","text":"hatS(t) = prod_i t_i  t left( 1 - fracd_in_i right)","category":"page"},{"location":"km/","page":"Kaplan-Meier","title":"Kaplan-Meier","text":"where d_i is the number of observed events at time t_i and n_i is the number of subjects at risk for the event just before time t_i.","category":"page"},{"location":"km/","page":"Kaplan-Meier","title":"Kaplan-Meier","text":"The pointwise standard error of the log of the survivor function can be computed using Greenwood's formula:","category":"page"},{"location":"km/","page":"Kaplan-Meier","title":"Kaplan-Meier","text":"textSE(log hatS(t)) = sqrtsum_i t_i  t fracd_in_i (n_i - d_i)","category":"page"},{"location":"km/#API","page":"Kaplan-Meier","title":"API","text":"","category":"section"},{"location":"km/","page":"Kaplan-Meier","title":"Kaplan-Meier","text":"Survival.KaplanMeier\nStatsBase.fit(::Type{KaplanMeier}, ::Any, ::Any)\nStatsBase.confint(::KaplanMeier, ::Float64)","category":"page"},{"location":"km/#Survival.KaplanMeier","page":"Kaplan-Meier","title":"Survival.KaplanMeier","text":"KaplanMeier\n\nAn immutable type containing survivor function estimates computed using the Kaplan-Meier method. The type has the following fields:\n\ntimes: Distinct event times\nnevents: Number of observed events at each time\nncensor: Number of right censored events at each time\nnatrisk: Size of the risk set at each time\nsurvival: Estimate of the survival probability at each time\nstderr: Standard error of the log survivor function at each time\n\nUse fit(KaplanMeier, ...) to compute the estimates and construct this type.\n\n\n\n\n\n","category":"type"},{"location":"km/#StatsAPI.fit-Tuple{Type{KaplanMeier}, Any, Any}","page":"Kaplan-Meier","title":"StatsAPI.fit","text":"fit(KaplanMeier, times, status) -> KaplanMeier\n\nGiven a vector of times to events and a corresponding vector of indicators that denote whether each time is an observed event or is right censored, compute the Kaplan-Meier estimate of the survivor function.\n\n\n\n\n\n","category":"method"},{"location":"km/#StatsAPI.confint-Tuple{KaplanMeier, Float64}","page":"Kaplan-Meier","title":"StatsAPI.confint","text":"confint(km::KaplanMeier, α=0.05)\n\nCompute the pointwise log-log transformed confidence intervals for the survivor function as a vector of tuples.\n\n\n\n\n\n","category":"method"},{"location":"km/#References","page":"Kaplan-Meier","title":"References","text":"","category":"section"},{"location":"km/","page":"Kaplan-Meier","title":"Kaplan-Meier","text":"Kaplan, E. L., and Meier, P. (1958). Nonparametric Estimation from Incomplete Observations. Journal of the American Statistical Association, 53(282), 457-481. doi:10.2307/2281868\nGreenwood, M. (1926). A Report on the Natural Duration of Cancer. Reports on Public Health and Medical Subjects. London: Her Majesty's Stationery Office. 33, 1-26.","category":"page"},{"location":"na/#Nelson-Aalen-Estimator","page":"Nelson-Aalen","title":"Nelson-Aalen Estimator","text":"","category":"section"},{"location":"na/","page":"Nelson-Aalen","title":"Nelson-Aalen","text":"The Nelson-Aalen estimator is a nonparametric estimator of the cumulative hazard function.","category":"page"},{"location":"na/","page":"Nelson-Aalen","title":"Nelson-Aalen","text":"The estimate is given by","category":"page"},{"location":"na/","page":"Nelson-Aalen","title":"Nelson-Aalen","text":"hatH(t) = sum_i t_i  t fracd_in_i","category":"page"},{"location":"na/","page":"Nelson-Aalen","title":"Nelson-Aalen","text":"where d_i is the number of observed events at time t_i and n_i is the number of subjects at risk for the event just before time t_i.","category":"page"},{"location":"na/","page":"Nelson-Aalen","title":"Nelson-Aalen","text":"The pointwise standard error of the log of the survivor function can be computed directly as the standard error or a Bernoulli random variable with d_i successes from n_i samples:","category":"page"},{"location":"na/","page":"Nelson-Aalen","title":"Nelson-Aalen","text":"textSE(hatH(t)) = sqrtsum_i t_i  t fracd_i(n_i-d_i)n_i^3","category":"page"},{"location":"na/#API","page":"Nelson-Aalen","title":"API","text":"","category":"section"},{"location":"na/","page":"Nelson-Aalen","title":"Nelson-Aalen","text":"Survival.NelsonAalen\nStatsBase.fit(::Type{NelsonAalen}, ::Any, ::Any)\nStatsBase.confint(::NelsonAalen, ::Float64)","category":"page"},{"location":"na/#Survival.NelsonAalen","page":"Nelson-Aalen","title":"Survival.NelsonAalen","text":"NelsonAalen\n\nAn immutable type containing cumulative hazard function estimates computed using the Nelson-Aalen method. The type has the following fields:\n\ntimes: Distinct event times\nnevents: Number of observed events at each time\nncensor: Number of right censored events at each time\nnatrisk: Size of the risk set at each time\nchaz: Estimate of the cumulative hazard at each time\nstderr: Standard error of the cumulative hazard\n\nUse fit(NelsonAalen, ...) to compute the estimates and construct this type.\n\n\n\n\n\n","category":"type"},{"location":"na/#StatsAPI.fit-Tuple{Type{NelsonAalen}, Any, Any}","page":"Nelson-Aalen","title":"StatsAPI.fit","text":"fit(NelsonAalen, times, status) -> NelsonAalen\n\nGiven a vector of times to events and a corresponding vector of indicators that denote whether each time is an observed event or is right censored, compute the Nelson-Aalen estimate of the cumulative hazard rate function.\n\n\n\n\n\n","category":"method"},{"location":"na/#StatsAPI.confint-Tuple{NelsonAalen, Float64}","page":"Nelson-Aalen","title":"StatsAPI.confint","text":"confint(na::NelsonAalen, α=0.05)\n\nCompute the pointwise confidence intervals for the cumulative hazard function as a vector of tuples.\n\n\n\n\n\n","category":"method"},{"location":"na/#References","page":"Nelson-Aalen","title":"References","text":"","category":"section"},{"location":"na/","page":"Nelson-Aalen","title":"Nelson-Aalen","text":"Nelson, W. (1969). Hazard plotting for incomplete failure data. Journal of Quality Technology 1, 27–52.","category":"page"},{"location":"","page":"Home","title":"Home","text":"DocTestSetup = :(using Survival, StatsBase)\nCurrentModule = Survival","category":"page"},{"location":"#Survival.jl","page":"Home","title":"Survival.jl","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"This package provides types and methods for performing survival analysis in Julia.","category":"page"},{"location":"#Installation","page":"Home","title":"Installation","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"The package is registered in Julia's General package registry, and so it can  be installed using Pkg.add(\"Survival\")) or via the Pkg REPL mode with ]add Survival.","category":"page"},{"location":"#Contents","page":"Home","title":"Contents","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Pages = [\n    \"events.md\",\n    \"km.md\",\n    \"na.md\",\n    \"cox.md\",\n]\nDepth = 1","category":"page"}]
}
