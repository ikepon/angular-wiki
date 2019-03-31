# ActiveJob か Sidekiq を直接使うか？
ActiveJob は Sidekiq や Resque のような job runner の違いを気にせず job を設定できるインターフェース。

共通化している分、 Sidekiq の細かい設定ができなくなる。

> Note that more advanced Sidekiq features (sidekiq_options) cannot be controlled or configured via ActiveJob, e.g. saving backtraces.

from: https://github.com/mperham/sidekiq/wiki/Active-Job

Sidekiq の細かい設定やエラーハンドリングが変わるので、必要に合わせて選択する必要がある。


参考
- [【Rails】SidekiqをActiveJob経由で使うのが良いか、直接使うのが良いのか。](http://thoames.hatenadiary.jp/entry/2018/03/22/131701)
- [Active Job Introduction](https://github.com/mperham/sidekiq/wiki/Active-Job#active-job-introduction)
- [Advantages when using ActiveJob with Sidekiq compare with Sidekiq alone](https://stackoverflow.com/questions/45305175/advantages-when-using-activejob-with-sidekiq-compare-with-sidekiq-alone)
