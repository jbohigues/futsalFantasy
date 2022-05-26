<?php

/** @var yii\web\View $this */
/** @var string $content */

use app\assets\AppAsset;
use app\widgets\Alert;
use yii\bootstrap4\Breadcrumbs;
use yii\bootstrap4\Html;
use yii\bootstrap4\Nav;
use yii\bootstrap4\NavBar;

AppAsset::register($this);
?>
<?php $this->beginPage() ?>
<!DOCTYPE html>
<html lang="<?= Yii::$app->language ?>" class="h-100">
<head>
    <meta charset="<?= Yii::$app->charset ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <?php $this->registerCsrfMetaTags() ?>
    <title><?= Html::encode($this->title) ?></title>
    <?php $this->registerLinkTag(['rel' => 'icon', 'type' => 'image/png', 'href' => '/favicon.png']); ?>
    <?php $this->head() ?>
</head>
<body class="d-flex flex-column h-100">
<?php $this->beginBody() ?>

<header>
    <?php
    if (Yii::$app->user->isGuest){
        $items = [
            ['label' => 'Inicio', 'url' => ['/site/index']],
            ['label' => 'Sobre nosotros', 'url' => ['/site/about']],
            ['label' => 'Contacto', 'url' => ['/site/contact']],
            ['label' => 'Login', 'url' => ['/site/login']]
        ];
    } else {
        $items = [
            ['label' => 'Inicio', 'url' => ['/site/index']],
            ['label' => 'Calendario', 'url' => ['/calendario/index']],
            ['label' => 'Jugadores reales', 'url' => ['/jugadores-reales/index']],
            ['label' => 'Equipos reales', 'url' => ['/equiposreales/index']],
            ['label' => 'Equipos usuarios', 'url' => ['/equiposusuarios/index']],
            ['label' => 'Usuarios', 'url' => ['/usuarios'],
                'visible'=> Yii::$app->user->identity->hasrole('A')],
            '<li>'
                . Html::beginForm(['/site/logout'], 'post', ['class' => 'form-inline'])
                . Html::submitButton(
                    'Logout (' . Yii::$app->user->identity->usuario . ')',
                    ['class' => 'btn btn-link logout']
                )
                . Html::endForm()
            . '</li>'
        ];
    }
    NavBar::begin([
        'brandLabel' => Yii::$app->name,
        'brandUrl' => Yii::$app->homeUrl,
        'options' => [
            'class' => 'navbar navbar-expand-md navbar-dark bg-dark fixed-top',
        ],
    ]);
    // var_dump(Yii::$app->user);
    echo Nav::widget([
        'options' => ['class' => 'navbar-nav'],
        'items' => $items,
    ]);
    NavBar::end();
    ?>
</header>

<main role="main" class="flex-shrink-0">
    <div class="container">
        <?= Breadcrumbs::widget([
            'links' => isset($this->params['breadcrumbs']) ? $this->params['breadcrumbs'] : [],
        ]) ?>
        <?= Alert::widget() ?>
        <?= $content ?>
    </div>
</main>

<footer class="footer mt-auto py-3 text-muted">
    <div class="container">
        <p class="float-left">&copy; FutsalFantasy <?= date('Y') ?></p>
        <p class="float-right"><?= Yii::powered() ?></p>
    </div>
</footer>

<?php $this->endBody() ?>
</body>
</html>
<?php $this->endPage() ?>
